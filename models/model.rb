#ActiveRecord::Base.establish_connection(
#  "adapter" => "sqlite3",
#  "database" => "development.sqlite3"
#)

require 'active_record'

ActiveRecord::Base.establish_connection(ENV["DATABASE_URL"] || "sqlite3:./Kakeibo.db")
