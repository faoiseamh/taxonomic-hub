class PagesController < ApplicationController
  include ReactOnRails::Controller
  before_action :set_categories

  def index
    # NOTE: The below notes apply if you want to set the value of the props in the controller, as
    # compared to the view. However, it's more convenient to use Jbuilder from the view. See
    # app/views/pages/index.html.erb:20
    #
    #  <%= react_component('App', props: render(template: "/categories/index.json.jbuilder"),
    #     prerender: true) %>
    #
    #
    # NOTE: this could be an alternate syntax if you wanted to pass categories as a variable to a partial
    # @categories_json_sting = render_to_string(partial: "/categories/categories.json.jbuilder",
    #                                         locals: { categories: Comment.all }, format: :json)
    # NOTE: @categories is used by the render_to_string call
    # @categories_json_string = render_to_string("/categories/index.json.jbuilder")
    # NOTE: It's CRITICAL to call respond_to after calling render_to_string, or else Rails will
    # not render the HTML version of the index page properly. (not a problem if you do this in the view)
    # respond_to do |format|
    #   format.html
    # end

    redux_store("routerCategoriesStore", props: categories_json_string)
    render_html
  end

  private

  def set_categories
    @categories = Category.all.includes(:topics).order('title')
  end

  def categories_json_string
    render_to_string(template: "/categories/index.json.jbuilder",
                     locals: { categories: Category.all.includes(:topics).order('title') }, format: :json)
  end

  def render_html
    respond_to do |format|
      format.html
    end
  end
end