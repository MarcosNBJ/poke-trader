# frozen_string_literal: true

FactoryBot.define do
  factory :trade do
    pokemons_group_one { %w[Glaceon Vaporeon] }
    pokemons_group_two { %w[Sylveon Jolteron] }
    is_fair { true }
  end
end
