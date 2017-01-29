class TopicsController < ApplicationController
  before_action :load_topic, only: [ :show ]

  def index
    respond_to do |format|
      format.json { render topics_json_render_params }
    end
  end

  def show
    respond_to do |format|
      format.json { render(partial: 'topics/topic', locals: { topic: @topic }) }
    end
  end

  def create
    @topic = Category.new(topic_params)

    if @topic.save
      render partial: 'topics/topic', locals: { topic: @topic}
    else
      render json: @topic.errors, status: :unprocessable_entity
    end
  end

  private
    def load_topic
      @topic = Topic.find(params[:id])
    end

    def topics_json_render_params
      {
        template: "/topics/index.json.jbuilder",
        locals: {
          topics: Category.all.includes(:topics)
        }
      }
    end

    def topics_json_string
      render_to_string topics_json_render_params, format: :json
    end

    def topic_params
      params.require(:topic).permit(:title, :subtitle, :body, :category_id)
    end
end