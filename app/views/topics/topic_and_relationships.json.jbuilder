json.topic do
  json.partial! 'topic', topic: topic
end
json.category_topic_relationships topic.category_topic_relationships, partial: 'category_topic_relationships/category_topic_relationship', as: :category_topic_relationship
