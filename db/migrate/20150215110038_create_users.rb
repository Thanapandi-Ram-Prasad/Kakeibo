class CreateUsers < ActiveRecord::Migration
  def up
    create_table :users do |t|
      t.text :user_name
      t.text :user_password
    end
  end
end
