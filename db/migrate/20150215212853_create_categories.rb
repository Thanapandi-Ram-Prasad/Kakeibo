class CreateCategories < ActiveRecord::Migration
  def up
    create_table :categories do |t|
      t.text :name
    end
  end
end
