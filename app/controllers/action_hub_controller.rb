class ActionHubController < ApplicationController
  include ReactOnRails::Controller
  def index
    @categories = Category.all.includes(:topics)
    redux_store("routerCategoriesStore", props: categories_json_string)
    respond_to :html
  end

  private
    def categories_json_render_params
      {
        template: "/categories/index.json.jbuilder",
        locals: {
          categories: @categories
        }
      }
    end

    def categories_json_string
      render_to_string categories_json_render_params, format: :json
    end
end