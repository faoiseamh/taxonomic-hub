Rails.application.routes.draw do
  root 'action_hub#index'

  get 'hello_world', to: 'hello_world#index'

  resources :topics
  resources :categories
end
