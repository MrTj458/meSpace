Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    get '/users/:user_id/posts', to: 'posts#index'
    get '/users/:user_id/posts/:id', to: 'posts#show'
    post '/users/:user_id/posts', to: 'post#create'
    put '/users/:user_id/posts/:id', to: 'post#update'
    delete '/users/:user_id/posts/:id', to: 'post#destroy'

    get '/users', to: 'users#index'
    get '/users/:id', to: 'users#show'
  end

  #Do not place any routes below this one
  if Rails.env.production?
    get '*other', to: 'static#index'
  end
end
