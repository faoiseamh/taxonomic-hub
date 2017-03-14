class CreateFavorites < ActiveRecord::Migration[5.0]
  def change
    create_table :favorites do |t|
      t.integer :user_id, presence: true
      t.integer :event_id, presence: true
      t.timestamps
    end
  end
end
