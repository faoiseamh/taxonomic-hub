class Category < ActiveRecord::Base
  has_many :category_topic_relationships, -> { where is_active: true }
  has_many :topics, -> { where is_active: true }, through: :category_topic_relationships

  def self.active
    where is_active: true
  end

  def deactivate!
    self.class.transaction do
      self.category_topic_relationships.each do |category_topic_relationship|
        category_topic_relationship.update_attribute :is_active, false
      end
      self.update_attribute :is_active, false
    end
  end
end
