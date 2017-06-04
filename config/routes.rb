Rails.application.routes.draw do
  # Override devise get routes
  scope :users do
    get :sign_in, to: "pages#index"
    get :sign_up, to: "pages#index"
  end

  devise_for :users, controllers: {
            registrations: 'registrations',
            passwords: 'passwords',
            sessions: 'sessions',
         }

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'


  scope :api do
    resources :categories
    resources :events
    resources :topics
    resources :event_favorites, only: [:create, :destroy]
    scope :users, controller: 'users' do
      post :sign_in, action: 'sign_in'
    end
  end


  root "pages#index"

  # React Router needs a wildcard
  # get "react-router(/*all)", to: "pages#index"
  get "*path", to: "pages#index"

end
