require 'sinatra'
require "sinatra/reloader" if development?
require './models/model.rb'


class User < ActiveRecord::Base
  has_many :lists
  validates :user_name, :user_password, presence: true
end


class Category < ActiveRecord::Base
  has_many :lists
  validates :name, presence: true
end


class List < ActiveRecord::Base
  belongs_to :user
  belongs_to :category
  validates :title, :price, :spent_date, presence: true
end


use Rack::Session::Cookie
set :sessions, true


get '/' do
  erb :index
end

get '/sign_up' do
  erb :sign_up
end

post '/sign_up' do

  if User.find_by( {:user_name => params[:user_name], :user_password => params[:user_password]} ) then
    @error_msg = "このアカウントは既に存在します！"
    erb :sign_up
  else
    User.create( {:user_name => params[:user_name], :user_password => params[:user_password]} )
    @msg = "アカウントが作成されました！"
    erb :login
  end

end

get '/login' do

  if User.find_by( {:user_name => params[:user_name], :user_password => params[:user_password]} ) then
    session[:user_id] = User.find_by( {:user_name => params[:user_name], :user_password => params[:user_password]} ).id
    redirect "/users"
  else

  end

  erb :login
end

get '/logout' do
  session[:user_id] = nil
  erb :logout
end

get '/users' do

  if session[:user_id].nil?
  redirect '/'
  end

  @user = User.find(session[:user_id])
  select_date = params[:select_date]

  if !select_date.nil?
    redirect "/date/#{select_date}"
  else

  end

  select_month = params[:select_month]
  if !select_month.nil?
    redirect "/month/#{select_month}"
  else

  end

  select_year = params[:select_year]
  if !select_year.nil?
    redirect "/year/#{select_year}"
  else

  end

  erb :users
end

get '/new_format' do

  if session[:user_id].nil?
    redirect '/'
  end

  #user_id = session[:user_id]
  #@lists = List.where(user_id: user_id).group(:category_id)
  erb :new
end

post '/users' do
  user_id = User.find(session[:user_id])
  category = Category.find_or_create_by( {:name => params[:category]} )
  list = category.lists.create( {:title => params[:title], :price => params[:price], :spent_date => params[:spent_date], :user_id => user_id.id} )

  if list.save!
    redirect "/users"
  else

  end

end

get '/date/:select_date' do

  if session[:user_id].nil?
  redirect '/'
  end

  user_id = User.find(session[:user_id])
  @select_date = params[:select_date]
  @lists = List.where(spent_date: params[:select_date]).where(user_id: user_id)
  @categories = @lists.group(:category_id)
  @categories_sum = @categories.sum(:price)
  @sum = @lists.sum(:price)
  erb :date_show
end

get '/:select_date/:id/delete' do
  list = List.find(params[:id])
  list.destroy
  redirect "/date/#{params[:select_date]}"
end

get '/:id/edit_format' do

  if session[:user_id].nil?
  redirect '/'
  end

  @list = List.find(params[:id])
  user_id = session[:user_id]
  @lists = List.where(user_id: user_id).group(:category_id)
  erb :edit
end

post '/edit/:id' do
  list = List.find_by(id: params[:id])

  if Category.find_or_create_by( {:name => params[:category]} )
    list.update( {:category_id => Category.find_or_create_by( {:name => params[:category]} ).id, :title => params[:title], :price => params[:price], :spent_date => params[:spent_date]} )
    redirect "/date/#{list.spent_date}"
  else

  end

end

get '/month/:select_month' do

  if session[:user_id].nil?
  redirect '/'
  end

  user_id = session[:user_id]
  @select_month = params[:select_month]
  @lists = List.where("spent_date LIKE?", "%#{params[:select_month]}%").where(user_id: user_id)
  @group_lists = @lists.group(:spent_date)
  @categories = @lists.group(:category_id)
  @categories_sum = @categories.sum(:price)
  @sum = @lists.sum(:price)
  erb :month_show
end

get '/year/:select_year' do

  if session[:user_id].nil?
  redirect '/'
  end

  user_id = session[:user_id]
  @select_year = params[:select_year]
  @categories = List.where("spent_date LIKE?", "%#{params[:select_year]}%").where(user_id: user_id).group(:category_id)
  @categories_sum = @categories.sum(:price)
  @sum = List.where("spent_date LIKE?", "%#{params[:select_year]}%").where(user_id: user_id).sum(:price)
  erb :year_show
end

get '/category_month/:id/:month' do

  if session[:user_id].nil?
  redirect '/'
  end

  user_id = session[:user_id]
  @category_month = params[:month]
  @category = Category.find(params[:id])
  @lists = List.where("category_id LIKE?", "%#{params[:id]}%").where(user_id: user_id).group(:spent_date)
  @lists_sum = @lists.sum(:price)
  erb :category_month
end

get '/category_year/:id/:year' do

  if session[:user_id].nil?
  redirect '/'
  end

  user_id = session[:user_id]
  @category_year = params[:year]
  @category = Category.find(params[:id])
  @sum_junuary = List.where("category_id LIKE?", "%#{params[:id]}%").where("spent_date LIKE?", "%#{params[:year]}-01%").where(user_id: user_id).sum(:price)
  @sum_february = List.where("category_id LIKE?", "%#{params[:id]}%").where("spent_date LIKE?", "%#{params[:year]}-02%").where(user_id: user_id).sum(:price)
  @sum_march = List.where("category_id LIKE?", "%#{params[:id]}%").where("spent_date LIKE?", "%#{params[:year]}-03%").where(user_id: user_id).sum(:price)
  @sum_april = List.where("category_id LIKE?", "%#{params[:id]}%").where("spent_date LIKE?", "%#{params[:year]}-04%").where(user_id: user_id).sum(:price)
  @sum_may = List.where("category_id LIKE?", "%#{params[:id]}%").where("spent_date LIKE?", "%#{params[:year]}-05%").where(user_id: user_id).sum(:price)
  @sum_june = List.where("category_id LIKE?", "%#{params[:id]}%").where("spent_date LIKE?", "%#{params[:year]}-06%").where(user_id: user_id).sum(:price)
  @sum_july = List.where("category_id LIKE?", "%#{params[:id]}%").where("spent_date LIKE?", "%#{params[:year]}-07%").where(user_id: user_id).sum(:price)
  @sum_august = List.where("category_id LIKE?", "%#{params[:id]}%").where("spent_date LIKE?", "%#{params[:year]}-08%").where(user_id: user_id).sum(:price)
  @sum_september = List.where("category_id LIKE?", "%#{params[:id]}%").where("spent_date LIKE?", "%#{params[:year]}-09%").where(user_id: user_id).sum(:price)
  @sum_october = List.where("category_id LIKE?", "%#{params[:id]}%").where("spent_date LIKE?", "%#{params[:year]}-10%").where(user_id: user_id).sum(:price)
  @sum_november = List.where("category_id LIKE?", "%#{params[:id]}%").where("spent_date LIKE?", "%#{params[:year]}-11%").where(user_id: user_id).sum(:price)
  @sum_december = List.where("category_id LIKE?", "%#{params[:id]}%").where("spent_date LIKE?", "%#{params[:year]}-12%").where(user_id: user_id).sum(:price)
  erb :category_year
end
