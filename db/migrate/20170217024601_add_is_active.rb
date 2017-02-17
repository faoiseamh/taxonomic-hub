class AddIsActive < ActiveRecord::Migration[5.0]
  def change
    %i(topics categories category_topic_relationships).each do |table|
      add_column table, :is_active, :boolean, null: false, default: true
    end
  end
end
