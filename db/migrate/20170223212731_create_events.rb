class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.datetime :date
      t.float :location_lat
      t.float :location_lon
      t.string :location_name
      t.text :body
      t.references :created_by, index: true, references: :users
      t.boolean :is_active, null: false, default: true

      t.timestamps
    end
  end
end
