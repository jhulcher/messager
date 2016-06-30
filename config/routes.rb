Rails.application.routes.draw do

  root to: "static_pages#root"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :destroy, :create]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show]
    resources :messages, only: [:new, :create]
  end

end
