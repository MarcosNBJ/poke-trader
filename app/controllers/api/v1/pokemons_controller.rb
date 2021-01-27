# frozen_string_literal: true

module Api
  module V1
    class PokemonsController < ApiController
      before_action :pagination_params, only: %i[index]
      before_action :set_pokemon, only: %i[show]

      def index
        @pokemons = Pokemon
                    .offset(pagination_params[:offset])
                    .limit(pagination_params[:limit])
        render_json_reponse(:ok, @pokemons)
      end

      def show
        render_json_reponse(:ok, @pokemon) and return if @pokemon

        render_json_reponse(:unprocessable_entity,
                            'No Pokemon was found with the given name')
      end

      private def pagination_params
        params.permit(:offset, :limit)
      end
      private def set_pokemon
        @pokemon = Pokemon.find_by(name: params[:id])
      end
    end
  end
end
