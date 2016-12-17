class CategoriesController < ApplicationController
  def index
    @categories = Category.all.includes(:topics)
  end

  def create
    @category = Category.new(category_params)

    if @category.save
      render partial: 'categories/category', locals: { category: @category}
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  private

    def category_params
      params.require(:category).permit(:title)
    end
end
