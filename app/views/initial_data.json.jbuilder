json.categories categories, partial: 'categories/category', as: :category
json.topics topics, partial: 'topics/topic', as: :topic
json.category_topic_relationships category_topic_relationships, partial: 'category_topic_relationships/category_topic_relationship', as: :category_topic_relationship
json.current_user current_user
