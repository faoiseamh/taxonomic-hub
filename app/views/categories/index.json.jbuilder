json.data(@categories) do |category|
  json.partial! 'categories/category', category: category
end