class CategoryTopicRelationship < ActiveRecord::Base
  include ActiveStateHelper

  belongs_to :category, -> { where is_active: true }
  belongs_to :topic, -> { where is_active: true }
end
