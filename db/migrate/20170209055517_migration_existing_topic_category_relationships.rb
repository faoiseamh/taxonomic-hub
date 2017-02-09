class MigrationExistingTopicCategoryRelationships < ActiveRecord::Migration[5.0]
  def up
    Topic.all.each do |topic|
      CategoryTopicRelationship.create!(
        topic_id: topic.id,
        category_id: topic.category_id,
      )
    end
  end
end
