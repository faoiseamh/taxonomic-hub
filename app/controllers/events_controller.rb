class EventsController < ApplicationController
  before_action :load_event, only: [ :show, :update, :destroy ]

  def index
    respond_to do |format|
      format.json { render events_json_render_params }
    end
  end

  def show
    respond_to do |format|
      format.json { render(partial: 'events/event', locals: { event: @event }) }
    end
  end

  def create
    @event = Event.new(event_params)

    if @event.save
      render template: 'events/event_and_relationships', locals: { event: @event }
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def update
    if @event.update(event_params)
      render template: 'events/event_and_relationships', locals: { event: @event }
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @event.deactivate!
  end

  private
    def load_event
      @event = Event.active.find(params[:id])
    end

    def event_params
      params.require(:event).permit(
        :title,
        :subtitle,
        :body,
        event_topic_relationships_attributes: [
          :id,
          :topic_id,
          :_destroy,
        ]
      )
    end
end
