class Api::V1::NotesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    hike = Hike.find(params[:hike_id])

    notes = hike.notes

    render json: notes
  end

  def create
    data = JSON.parse(request.body.read)
    selectedHike = Hike.find(data["hike_id"])

    new_note = Note.create!(
      user: current_user,
      hike: selectedHike,
      header: data["header"],
      body: data["body"]
    )

    render json: new_note
  end

  def destroy
    noteToDelete = Note.find(params[:id])
    noteToDelete.delete
  end

  def update
    data = JSON.parse(request.body.read)
    note = Note.find(params[:id])

    note.update(
      header: data["header"],
      body: data["body"]
    )
  end

end
