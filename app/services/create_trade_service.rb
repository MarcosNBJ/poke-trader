# frozen_string_literal: true

class CreateTradeService
  def initialize(params)
    @trade_params = params
  end

  def call
    @trade = Trade.new(trade)
    return OpenStruct.new(success: true, trade: @trade, errors: nil) if @trade.save

    OpenStruct.new(success: false, trade: nil, errors: @trade.errors)
  end

  private def trade
    {
      pokemons_group_one: pokemon_group_info(@trade_params[:pokemons_group_one]),
      pokemons_group_two: pokemon_group_info(@trade_params[:pokemons_group_two]),
      is_fair: @trade_params[:is_fair]
    }
  end

  private def pokemon_group_info(pokemon_group)
    pokemon_group_info = []
    pokemon_group.each do |pokemon_name|
      pokemon = Pokemon.find_by(name: pokemon_name)
      pokemon_info = {
        name: pokemon.name,
        sprite: pokemon.sprite
      }
      pokemon_group_info.push(pokemon_info)
    end
    pokemon_group_info
  end
end
