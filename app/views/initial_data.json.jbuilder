json.categories categories, partial: 'categories/category', as: :category
json.topics topics, partial: 'topics/topic', as: :topic
json.category_topic_relationships category_topic_relationships, partial: 'category_topic_relationships/category_topic_relationship', as: :category_topic_relationship
json.current_user current_user

# Event data. Later, this will be loaded on demand as it will grow significantly
json.events events, partial: 'events/event', as: :event
json.event_topic_relationships event_topic_relationships, partial: 'event_topic_relationships/event_topic_relationship', as: :event_topic_relationship
json.event_favorites event_favorites, partial: 'event_favorites/event_favorite', as: :event_favorite
