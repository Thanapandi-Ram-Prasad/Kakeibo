source "https://rubygems.org"

gem 'sinatra'
gem 'heroku'
gem 'activerecord'
gem 'sinatra-activerecord', :require => 'sinatra/activerecord'
gem "rake"

group :development do
  gem 'sqlite3', groups: %w(test development), require: false
end

group :production do
  gem 'pg', groups: %w(production), require:
  gem "foreman"
end
