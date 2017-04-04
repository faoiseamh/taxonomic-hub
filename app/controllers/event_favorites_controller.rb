class EventFavoritesController < ApplicationController

  def create
    @event_favorite = current_user.event_favorites.new(event_favorite_params)

    if @event_favorite.save
      render partial: 'event_favorites/event_favorite', locals: { event_favorite: @event_favorite}
    else
      render json: @event_favorite.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @event_favorite = EventFavorite.find_by(event_id: params[:id], user_id: current_user.id, is_active: true)

    # TODO: Replace this with deactivate when ActiveStateHelper is fixed
    @event_favorite.update(is_active: false)
    render partial: 'event_favorites/event_favorite', locals: { event_favorite: @event_favorite}
  end

  private
  def event_favorite_params
    params.require(:event_favorite).permit(
      :event_id,
    )
  end
end
