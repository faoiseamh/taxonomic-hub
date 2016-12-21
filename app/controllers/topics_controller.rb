class TopicsController < ApplicationController
  before_action :load_topic, only: [:show]

  def show
  end

  protected

    def load_topic
      @topic = Topic.find(params[:id])
    end
end
