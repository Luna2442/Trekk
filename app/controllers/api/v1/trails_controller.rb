class Api::V1::TrailsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    search = params[:search]

    response = HTTParty.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query=#{search}+hiking+trails&radius=100&key=AIzaSyB5KSiNWNW318XVycsRXfNYFjZNyz4IOa0")

    render json: response
  end
end
