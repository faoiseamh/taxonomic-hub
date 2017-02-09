class Category < ActiveRecord::Base
  has_many :category_topic_relationships
  has_many :topics, through: :category_topic_relationships
end
