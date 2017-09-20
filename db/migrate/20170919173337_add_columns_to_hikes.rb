class AddColumnsToHikes < ActiveRecord::Migration[5.1]
  def change
    change_table :hikes do |t|
      t.integer :longitude
      t.integer :latitude
      t.string :types
    end
  end
end
