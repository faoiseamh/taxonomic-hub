class Event < ApplicationRecord
  belongs_to :created_by, class_name: "User"
  has_many :topics, -> { where is_active: true }, through: :event_topic_relationships
  has_many :event_topic_relationships, -> { where is_active: true }

  accepts_nested_attributes_for :event_topic_relationships, allow_destroy: true

  # before_validation :find_category_topic_relationships

end
