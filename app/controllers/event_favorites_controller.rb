class EventFavoritesController < ApplicationController

  def create
    debugger
    @event_favorite = current_user.event_favorites.new(event_id: params[:event_id])

    if @event_favorite.save
      render partial: 'event_favorites/event_favorite', locals: { event_favorite: @event_favorite}
    else
      render json: @event_favorite.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @event_favorite = EvenFavorite.find_by(event_id: params[:event_id], user_id: current_user)

    # TODO: Replace this with deactivate when ActiveStateHelper is fixed
    @event_user_relationship.update(is_active: false)
  end
end