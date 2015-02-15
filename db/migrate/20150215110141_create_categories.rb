class CreateCategories < ActiveRecord::Migration
  def up
    create_table :users do |t|
      t.text :name
    end
  end
end
