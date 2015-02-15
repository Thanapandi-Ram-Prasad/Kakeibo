class CreateLists < ActiveRecord::Migration
  def up
    create_table :lists do |t|
      t.integer :category_id
      t.integer :user_id
      t.text :title
      t.integer :price
      t.text :spent_date
    end
  end
end
