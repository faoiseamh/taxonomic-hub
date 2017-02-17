class Topic < ActiveRecord::Base
  has_many :categories, -> { where is_active: true }, through: :category_topic_relationships
  has_many :category_topic_relationships, -> { where is_active: true }

  accepts_nested_attributes_for :category_topic_relationships, allow_destroy: true

  before_validation :find_category_topic_relationships

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

  protected

    # Populate the category_topic_relationships relationship with proper ids so nested creation
    # works even without id passed for an existing relation
    def find_category_topic_relationships
      self.category_topic_relationships = self.category_topic_relationships.map do |r|
        if r.id
          r
        else
          CategoryTopicRelationship.where(topic_id: self.id, category_id: r.category_id).first_or_initialize
        end
      end
    end
end
