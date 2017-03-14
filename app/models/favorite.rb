class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :event

  after_create :set_active

  def set_active
    self.active = true
  end

  def self.users_for_event(event_id)
    User.joins(:favorites).where(favorites: { event_id: event_id, active: true })
  end

  def self.fav_events_by_user(user_id)
    Event.joins(:favorites).where(favorites: { user_id: user_id, active: true })
  end
end
