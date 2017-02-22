class CategoriesController < ApplicationController
  before_action :load_category, only: [ :update, :destroy ]

  def index
    respond_to do |format|
      format.json { render categories_json_render_params }
    end
  end

  def create
    @category = Category.new(category_params)

    if @category.save
      render partial: 'categories/category', locals: { category: @category}
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  def update
    if @category.update(category_params)
      render template: 'categories/_category', locals: { category: @category }
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end


  def destroy
    @category.deactivate!
  end

  private
    def categories_json_render_params
      {
        template: "/categories/index.json.jbuilder",
        locals: {
          categories: Category.all.includes(:topics)
        }
      }
    end

    def categories_json_string
      render_to_string categories_json_render_params, format: :json
    end

    def category_params
      params.require(:category).permit(:title, :color)
    end

    def load_category
      @category = Category.find(params[:id] || params[:category_id])
    end
end
