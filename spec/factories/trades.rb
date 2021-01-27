# frozen_string_literal: true

FactoryBot.define do
  factory :trade do
    pokemons_group_one { %w[Glaceon] }
    pokemons_group_two { %w[Sylveon] }
    is_fair { true }
  end
end
