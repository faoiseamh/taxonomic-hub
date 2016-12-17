class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.string :title, null: false
      t.string :subtitle, null: false
      t.text :body, null: false
      t.references :category, index: true, foreign_key: true, null: false

      t.timestamps null: false
    end
  end
end
