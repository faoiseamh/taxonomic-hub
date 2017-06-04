module ApiErrorHelper
  def error!(message, code)
    render text: message, status: code
  end
end
