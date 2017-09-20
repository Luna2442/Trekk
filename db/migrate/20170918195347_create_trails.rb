class CreateTrails < ActiveRecord::Migration[5.1]
  def change
    create_table :trails do |t|
      t.string :name
      t.string :city
      t.string :state
      t.string :country
      t.string :name
      t.integer :unique_id
      t.text :directions
      t.integer :latitude
      t.integer :longitude
      t.text :description
      t.string :activities

      t.timestamps
    end
  end
end
