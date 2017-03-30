json.event do
  json.partial! 'event', event: event
end
json.event_topic_relationships event.event_topic_relationships, partial: 'event_topic_relationships/event_topic_relationship', as: :event_topic_relationship
