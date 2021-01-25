# frozen_string_literal: true

module Api
  module V1
    class ApiController < ApplicationController
      protect_from_forgery with: :null_session

      private def render_json_reponse(status, data)
        render json: {
          code: Rack::Utils::SYMBOL_TO_STATUS_CODE[status],
          data: data
        }, status: status
      end
    end
  end
end
