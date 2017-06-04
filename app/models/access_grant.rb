class AccessGrant < ActiveRecord::Base
  include Tokenable
  TOKEN_FIELDS = %w(code access_token refresh_token)
  TOKEN_LENGTH = 16
  EXPIRATION_TIME = 36.hours
  # Offline sessions get a very long expiration time to ensure that when they come online they are still active
  # This is safe because offline sessions are ONLY used when the organization is handling encryption on the device-level and does not require the same protection from Parable
  EXPIRATION_TIME_OFFLINE = 6.months

  belongs_to :user

  def self.find_access(access_token)
    where("access_token = ? AND (access_token_expires_at = ? OR access_token_expires_at > ?)", access_token, nil, Time.now).first
  end

  def self.prune!
    # Prune standard sessions
    prune_time = (2*EXPIRATION_TIME).seconds.ago
    where("created_at < ?", prune_time).delete_all

    # Prune offline sessions
    prune_time = (1.1*EXPIRATION_TIME_OFFLINE).seconds.ago
    where("created_at < ?", prune_time).delete_all
  end

  def self.authenticate(code, application_id)
    where(:code => code, :application_id => application_id).first
  end

  def start_expiry_period!(expire_time = nil)
    expire_time ||= expiration_time.from_now
    self.update_attribute(:access_token_expires_at, expire_time)
  end

  # Return seconds till expiration
  def access_token_expires_in
    access_token_expires_at.to_i - Time.now.to_i
  end

  def expiration_time
    EXPIRATION_TIME
  end

  def redirect_uri_for(redirect_uri)
    if redirect_uri =~ /\?/
      redirect_uri + "&code=#{code}&response_type=code"
    else
      redirect_uri + "?code=#{code}&response_type=code"
    end
  end

  # Update expiration time and return whether successful or not
  def refresh(supplied_refresh_token, expire_time = nil)
    if supplied_refresh_token == refresh_token
      extend_time(expire_time)
      true
    else
      false
    end
  end

  def extend_time(expire_time = nil)
    expire_time ||= expiration_time.from_now
    update_attribute :access_token_expires_at, expire_time
  end
end
