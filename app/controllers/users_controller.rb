class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @hikes = @user.hikes
  end
end
