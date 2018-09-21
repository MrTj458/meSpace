class Api::UsersController < ApplicationController
  def index
    render json: User.all
  end

  def show
    render json: User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update(params.require(:user).permit(:bio))
      render json: @user
    else
      render json: {errors: @user.errors}
    end
  end
end
