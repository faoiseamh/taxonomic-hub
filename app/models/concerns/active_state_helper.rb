module ActiveStateHelper
  extend ActiveSupport::Concern

  included do |klass|
    klass.extend ClassMethods
  end

  module ClassMethods
    def active
      where is_active: true
    end
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