# frozen_string_literal: true

class Trade
  include Mongoid::Document
  include Mongoid::Timestamps
  field :pokemons_group_one, type: Array
  field :pokemons_group_two, type: Array
  field :is_fair, type: Boolean, default: false

  validates :pokemons_group_one,
            :pokemons_group_two,
            :is_fair, presence: true

  validates :pokemons_group_one, :pokemons_group_two, length: { minimum: 1, maximum: 6 }
end
