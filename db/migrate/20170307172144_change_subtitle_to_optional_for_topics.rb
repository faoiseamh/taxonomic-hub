class ChangeSubtitleToOptionalForTopics < ActiveRecord::Migration[5.0]
  def change
    change_column :topics, :subtitle, :string, null: true
  end
end
