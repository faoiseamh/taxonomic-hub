module Tokenable
  extend ActiveSupport::Concern

  included do
    before_create :generate_tokens
  end

  protected

  def generate_tokens
    token_fields = defined?(self.class::TOKEN_FIELDS) ? self.class::TOKEN_FIELDS : %w(token)
    token_length = defined?(self.class::TOKEN_LENGTH) ? self.class::TOKEN_LENGTH : 16
    token_type = defined?(self.class::TOKEN_TYPE) ? self.class::TOKEN_TYPE : :base64
    token_fields.each do |token_field|
      generate_token(token_field, token_type, token_length)
    end
  end

  def generate_token(field, type, length)
    unique_token = loop do
      case type
      when :hex
        random_token = SecureRandom.hex(length/2)
      when :base64
        random_token = SecureRandom.urlsafe_base64(length*3/4, false)
      end
      break random_token unless self.class.where(field => random_token).exists?
    end
    self.send("#{field}=", unique_token)
  end
end
