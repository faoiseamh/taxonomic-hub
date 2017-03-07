class ChangeBodyToOptionalForTopics < ActiveRecord::Migration[5.0]
  def change
    change_column :topics, :body, :text, null: true
  end
end
