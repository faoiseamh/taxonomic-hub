json.data(@categories) do |category|
  json.extract! category, :id, :title
  json.topics(category.topics) do |topic|
    json.extract! topic, :id, :title
  end
end