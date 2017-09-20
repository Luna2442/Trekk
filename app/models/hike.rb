class Hike < ApplicationRecord
  belongs_to :user
  has_many :trails
end
