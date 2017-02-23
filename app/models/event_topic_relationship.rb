class EventTopicRelationship < ActiveRecord::Base
  include ActiveStateHelper

  belongs_to :event
  belongs_to :topic
end
