class CreateNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :notes do |t|
      t.belongs_to :hike
      t.string :header
      t.text :body

      t.timestamps
    end
  end
end
