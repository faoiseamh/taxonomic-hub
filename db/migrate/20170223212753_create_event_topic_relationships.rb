class CreateEventTopicRelationships < ActiveRecord::Migration[5.0]
  def change
    create_table :event_topic_relationships do |t|
      t.references :event, foreign_key: true
      t.references :topic, foreign_key: true
      t.boolean :is_active, null: false, default: true

      t.timestamps
    end
  end
end
