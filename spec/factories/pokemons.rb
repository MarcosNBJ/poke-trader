# frozen_string_literal: true

FactoryBot.define do
  factory :pokemon do
    name { 'Glaceon' }
    hp {100 }
    attack { 22 }
    defense { 36 }
    base_experience { 184 }
    sprite { 'sprite_url' }
  end
end
