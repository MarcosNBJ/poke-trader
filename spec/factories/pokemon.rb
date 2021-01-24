# frozen_string_literal: true

FactoryBot.define do
  factory :pokemon do
    name { 'Glaceon' }
    base_experience { 184 }
    sprite { 'sprite_url' }
  end
end
