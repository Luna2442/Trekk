class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    hikes = current_user.hikes

    render json: hikes
  end
end
