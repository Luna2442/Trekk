Rails.application.routes.draw do
  root to: redirect('/users/me')

  devise_for :users, controllers: {
        sessions: 'users/sessions'
      }

  resources :users, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :users, only: [:show] do
        resources :hikes, only: [:destroy, :update, :show]
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :trails, only: [:index]
      get "/trails/:search", to:"trails#index"
    end
  end

  namespace :api do
    namespace :v1 do
      resources :hikes, only: [:create, :index]
    end
  end

  resources :trails, only: [:index, :show]

end
