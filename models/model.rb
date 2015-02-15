#ActiveRecord::Base.establish_connection(
#  "adapter" => "sqlite3",
#  "database" => "development.sqlite3"
#)

ActiveRecord::Base.establish_connection('sqlite3:///development.sqlite3')
