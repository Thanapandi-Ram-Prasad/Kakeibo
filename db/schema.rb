# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150215110141) do

  create_table "categories", force: :cascade do |t|
    t.text "name"
  end

  create_table "lists", force: :cascade do |t|
    t.integer "category_id"
    t.integer "user_id"
    t.text    "title"
    t.integer "price"
    t.integer "spent_date"
  end

  create_table "users", force: :cascade do |t|
    t.text "user_name"
    t.text "user_password"
  end

end
