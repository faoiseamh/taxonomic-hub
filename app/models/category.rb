class Category < ActiveRecord::Base
  include ActiveStateHelper

  has_many :category_topic_relationships, -> { where is_active: true }
  has_many :topics, -> { where is_active: true }, through: :category_topic_relationships
end
