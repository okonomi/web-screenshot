Rails.application.routes.draw do
  resources :screenshots, param: :key
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
