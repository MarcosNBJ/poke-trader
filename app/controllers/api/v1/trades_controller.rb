# frozen_string_literal: true

module Api
  module V1
    class TradesController < ApiController
      before_action :pagination_params, only: %i[index]

      def create
        @result = CreateTradeService.new(trade_params).call

        render_json_reponse(:created, @result.trade) and return if @result.success

        render_json_reponse(:unprocessable_entity, @result.errors)
      end

      def index
        @trades = Trade
                  .offset(pagination_params[:offset])
                  .limit(pagination_params[:limit])
                  .only(:pokemons_group_one, :pokemons_group_two, :is_fair)
       render_json_reponse(:ok, @trades)
      end

      private def trade_params
        params.require(:trade).permit(
          :is_fair,
          pokemons_group_one: [],
          pokemons_group_two: []
        )
      end

      private def pagination_params
        params.permit(:offset, :limit)
      end
    end
  end
end
