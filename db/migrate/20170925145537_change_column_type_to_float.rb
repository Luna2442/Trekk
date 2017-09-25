class ChangeColumnTypeToFloat < ActiveRecord::Migration[5.1]
  def change
    change_column(:hikes, :latitude, :float)
    change_column(:hikes, :longitude, :float)
  end
end
