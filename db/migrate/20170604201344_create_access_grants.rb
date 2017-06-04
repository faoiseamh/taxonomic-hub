class CreateAccessGrants < ActiveRecord::Migration[5.0]
  def change
    create_table :access_grants do |t|
      t.string :code
      t.string :access_token
      t.string :refresh_token
      t.datetime :access_token_expires_at
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
