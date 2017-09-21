class AddUserToNotes < ActiveRecord::Migration[5.1]
  def change
    change_table :notes do |t|
      t.belongs_to :user
    end
  end
end
