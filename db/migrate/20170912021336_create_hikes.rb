class CreateHikes < ActiveRecord::Migration[5.1]
  def change
    create_table :hikes do |t|
      t.belongs_to :user
      t.string :trail_name
      t.string :body
      t.string :location

      t.timestamps
    end
  end
end
