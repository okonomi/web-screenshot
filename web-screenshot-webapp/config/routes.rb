Rails.application.routes.draw do
  resources :screenshots, param: :key, constraints: { key: /[a-zA-Z0-9\.]+/ }, only: %i[index new create show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
