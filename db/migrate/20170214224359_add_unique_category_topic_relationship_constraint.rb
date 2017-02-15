class AddUniqueCategoryTopicRelationshipConstraint < ActiveRecord::Migration[5.0]
  def change
    add_index :category_topic_relationships, [:category_id, :topic_id], unique: true
  end
end
