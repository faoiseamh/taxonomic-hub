class TopicsController < ApplicationController
  before_action :load_topic, only: [ :show, :update, :destroy ]

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
    @topic = Topic.new(topic_params)

    if @topic.save
      render template: 'topics/topic_and_relationships', locals: { topic: @topic }
    else
      render json: @topic.errors, status: :unprocessable_entity
    end
  end

  def update
    if @topic.update(topic_params)
      render template: 'topics/topic_and_relationships', locals: { topic: @topic }
    else
      render json: @topic.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @topic.deactivate!
  end

  private
    def load_topic
      @topic = Topic.active.find(params[:id])
    end

    def topic_params
      params.require(:topic).permit(
        :title,
        :subtitle,
        :body,
        category_topic_relationships_attributes: [
          :id,
          :category_id,
          :_destroy,
        ]
      )
    end
end
