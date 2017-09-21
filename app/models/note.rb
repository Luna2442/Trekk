class Note < ApplicationRecord
  belongs_to :hike, dependent: :destroy
  belongs_to :user
end
