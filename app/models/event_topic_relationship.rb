class EventTopicRelationship < ApplicationRecord
  belongs_to :event
  belongs_to :topic
end
