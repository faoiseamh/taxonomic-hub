json.extract! category, :id, :title, :color
json.topics(category.topics) do |topic|
  json.extract! topic, :id, :title
end
