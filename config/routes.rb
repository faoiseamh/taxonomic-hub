Rails.application.routes.draw do
  root 'action_hub#index'

  resources :topics
  resources :categories
end
