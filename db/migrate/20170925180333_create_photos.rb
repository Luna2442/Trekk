class CreatePhotos < ActiveRecord::Migration[5.1]
  def change
    create_table :photos do |t|
      t.belongs_to :hike
      t.string :image

      t.timestamps
    end
  end
end
