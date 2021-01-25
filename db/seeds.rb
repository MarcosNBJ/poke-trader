# frozen_string_literal: true

require 'poke-api-v2'

(1..200).each do |i|
  pokemon = PokeApi.get(pokemon: i)

  hp = 0
  attack = 0
  defense = 0

  pokemon.stats.each do |stat|
    hp = stat.base_stat if stat.stat.name == 'hp'
    attack = stat.base_stat if stat.stat.name == 'attack'
    defense = stat.base_stat if stat.stat.name == 'defense'
  end

  Pokemon.create(
    name: pokemon.name,
    base_experience: pokemon.base_experience,
    hp: hp,
    attack: attack,
    defense: defense,
    sprite: pokemon.sprites.front_default
  )
end
