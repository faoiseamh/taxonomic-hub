class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception,
                       if: proc { request.headers["X-Auth"] != "tutorial_secret" }

  # before_action :authenticate_user!

  before_filter :configure_devise_params, if: :devise_controller?

  def configure_devise_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name,])
  end

end
