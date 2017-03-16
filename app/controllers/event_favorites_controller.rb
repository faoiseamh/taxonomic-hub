class EventFavoritesController < ApplicationController

  def create
    @event_favorite = current_user.event_favorites.new(event_id: params[:event_id])

    if @event_favorite.save
      render template: 'event_favorite/event_favorites'
    else
      render json: @event_favorite.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @event_user_relationship = EventUserRelationship.find_by(event_id: params[:event_id])

    # TODO: Replace this with deactivate when ActiveStateHelper is fixed
    @event_user_relationship.update :is_active, false
  end
end
