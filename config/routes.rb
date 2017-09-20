Rails.application.routes.draw do
  root to: redirect('/trails')

  devise_for :users, controllers: {
        sessions: 'users/sessions'
      }

  resources :users, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :users, only: [:show]
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
      resources :hikes, only: [:create, :destroy, :index, :show]
    end
  end

  resources :trails, only: [:index, :show]

end
