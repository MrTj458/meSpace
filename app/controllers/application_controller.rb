class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
	before_action :authenticate_user!, if: proc {
		begin
			request.controller_class.parent == Api
		rescue => NameError
			Rails.logger.error(NameError.message)
			nil
		end
	}
	before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname])
  end
end
