# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Trade, type: :model do
  subject { create(:trade) }

  it { is_expected.to be_mongoid_document }
  it { is_expected.to have_timestamps }
  it { expect(subject).to be_valid }
  it { is_expected.to have_field(:pokemons_group_one).of_type(Array) }
  it { is_expected.to have_field(:pokemons_group_two).of_type(Array) }
  it { is_expected.to have_field(:is_fair).of_type(Mongoid::Boolean) }
end
