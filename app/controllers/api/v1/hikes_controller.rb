class Api::V1::HikesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    data = JSON.parse(request.body.read)
    types = data["types"].join(", ").gsub!("_", " ")

    if current_user
      new_hike = Hike.create(
        user: current_user,
        trail_name: data["name"],
        body: '',
        location: data["location"],
        types: types,
        latitude: data["geometry"]["location"]["lat"],
        longitude: data["geometry"]["location"]["lng"]
      )
    else
      render json: nil
    end

    if new_hike.save
      flash.now[:notice] = "Hike added successfully"
      render json: new_hike
    else
      flash.now[:alert] = "Hike could not be added"
      render json: nil
    end

  end

  def destroy
    hikeToDelete = Hike.find(params[:id])
    hikeToDelete.delete
  end
end
