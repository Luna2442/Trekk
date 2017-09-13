Rails.application.routes.draw do
  root to: redirect('/hikes')

  devise_for :users, controllers: {
        sessions: 'users/sessions'
      }

  resources :users, only: [:show] do
    resources :hikes, only: [:index, :show]
  end

  resources :hikes, only: [:index]


end
