class Api::V1::PhotosController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    hike = Hike.find(params[:hike_id])

    photos = hike.photos

    render json: photos
  end

  def create
    data = JSON.parse(request.body.read)
    selectedHike = Hike.find(params[:hike_id])

    binding.pry

    new_photo = Photo.create!(
      hike: selectedHike,
      image: data["image"],
    )

    render json: new_photo
  end

end
