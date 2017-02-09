class Topic < ActiveRecord::Base
  has_many :categories, through: :category_topic_relationships
  has_many :category_topic_relationships
end
