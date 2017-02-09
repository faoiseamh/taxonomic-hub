class DropCategoryIdFromTopics < ActiveRecord::Migration[5.0]
  def up
    remove_column :topics, :category_id
  end
end
