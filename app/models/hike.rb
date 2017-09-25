class Hike < ApplicationRecord
  belongs_to :user
  has_many :notes, dependent: :destroy
  has_many :photos, dependent: :destroy
end
