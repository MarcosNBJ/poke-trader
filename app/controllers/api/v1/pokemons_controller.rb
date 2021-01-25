# frozen_string_literal: true

module Api
  module V1
    class PokemonsController < ApiController
      before_action :pagination_params, only: %i[index]

      def index
        @pokemons = Pokemon
                    .offset(pagination_params[:offset])
                    .limit(pagination_params[:limit])
                    .only(:name, :base_experience, :hp, :attack, :defense, :sprite)
        render_json_reponse(:ok, @pokemons) 
      end

      private

      def pagination_params
        params.permit(:offset, :limit)
      end
    end
  end
end
