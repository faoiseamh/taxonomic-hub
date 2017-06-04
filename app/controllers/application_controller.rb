class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception,
                       if: proc { request.headers["X-Auth"] != "tutorial_secret" }

  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

  # before_action :authenticate_user!

  before_action :configure_devise_params, if: :devise_controller?

  before_action :authenticate_api_user

  def configure_devise_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name,])
  end

  # Authenticate by auth token
  def authenticate_api_user
    if params[:auth_token] && @access_grant = AccessGrant.find_access(params[:auth_token])
      # request.env["devise.skip_trackable"] = true
      sign_in @access_grant.user
    end
  end

end
