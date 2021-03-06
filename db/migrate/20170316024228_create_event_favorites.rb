class CreateEventFavorites < ActiveRecord::Migration[5.0]
  def change
    create_table :event_favorites do |t|
      t.references :user, foreign_key: true, null: false
      t.references :event, foreign_key: true, null: false
      t.boolean :is_active, null: false, default: true
      t.timestamps
    end
  end
end
