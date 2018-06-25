Rails.application.routes.draw do
  resources :packages
  root 'packages#index'
end
