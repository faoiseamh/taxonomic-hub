class CategoryTopicRelationship < ApplicationRecord
  belongs_to :category, -> { where is_active: true }
  belongs_to :topic, -> { where is_active: true }

  def self.active
    where is_active: true
  end
end
