class EventFavorite < ApplicationRecord
  belongs_to :user, -> { where is_active: true }
  belongs_to :event, -> { where is_active: true }
end
