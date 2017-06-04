class UsersController < ApplicationController
  include ApiErrorHelper

  def sign_in
    begin
      if !params[:email] || !params[:password]
        error!("Invalid parameters", :bad_request) && return
      end

      user = User.find_by_email(params[:email].chomp(" "))
      # Perform devise logic that removes locks, etc.
      if user.nil?
        error!("Invalid email address.", :unauthorized) && return
      end

      user.valid_for_authentication?

      unless user.active_for_authentication?
        error!("Login disabled", :forbidden) && return
      end
      # if user.access_locked?
      #   error!("Locked: Too many login attempts. Unlock via email or wait 1 hour.", :forbidden) && return
      # end

      valid = user && user.valid_password?(params[:password])
      if valid
        AccessGrant.prune!
        access_grant = AccessGrant.create!(:user => user)
        if access_grant.new_record?
          error!("Unable to grant access", :unauthorized) && return
        end

        access_grant.start_expiry_period!

        @access_grant = access_grant
        @current_user = user
      else
        user.failed_attempts += 1
        user.save
        user.lock_access! if user.failed_attempts > user.class.maximum_attempts
        error!("Invalid login credentials", :unauthorized) && return
      end
    rescue ActiveRecord::RecordInvalid => e
      error! e.message, :bad_request && return
    end
  end
end

