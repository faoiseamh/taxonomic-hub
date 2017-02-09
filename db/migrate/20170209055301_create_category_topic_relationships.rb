class CreateCategoryTopicRelationships < ActiveRecord::Migration[5.0]
  def change
    create_table :category_topic_relationships do |t|
      t.references :category, foreign_key: true
      t.references :topic, foreign_key: true

      t.timestamps
    end
  end
end
