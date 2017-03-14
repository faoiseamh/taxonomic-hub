class AddActiveToFavorite < ActiveRecord::Migration[5.0]
  def change
    add_column :favorites, :active, :boolean
  end
end
