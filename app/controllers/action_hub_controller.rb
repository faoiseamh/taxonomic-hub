class ActionHubController < ApplicationController
  def index
    @categories = Category.all.includes(:topics)
  end
end