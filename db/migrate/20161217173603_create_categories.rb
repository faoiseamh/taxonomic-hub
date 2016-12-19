class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :title, null: false
      t.string :color, null: false, limit: 7

      t.timestamps null: false
    end
  end
end
