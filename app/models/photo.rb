class Photo < ApplicationRecord
  mount_uploader :image, HikePhotosUploader

  belongs_to :hike
end
