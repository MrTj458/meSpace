class Api::PostsController < ApplicationController
  before_action :set_user
  before_action :set_post, only: [:show, :update, :destroy]

  def index
    render json: @user.posts.order(created_at: :desc)
  end

  def show
    render json: @post
  end

  def create
    post = @user.post.new(post_params)

    if post.save
      render json: post
    else
      render json: {errors: post.errors}, status: 422
    end
  end

  def update
    if @post.update(post_params)
      render json: post
    else
      render json: {errors: post.errors}, status: 422
    end
  end

  def destroy
    @post.destroy
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end

  def set_post
    @post = User.posts.find(params[:id])
  end
end
