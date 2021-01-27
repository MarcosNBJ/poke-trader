# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Pokemon, type: :model do
  subject { create(:pokemon) }

  it { is_expected.to be_mongoid_document }
  it { is_expected.to have_timestamps }
  it { expect(subject).to be_valid }
  it { is_expected.to have_field(:name).of_type(String) }
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to have_field(:sprite).of_type(String) }
  it { is_expected.to validate_presence_of(:sprite) }
  it { is_expected.to have_field(:base_experience).of_type(Integer) }
  it { expect(subject.base_experience).to be > 0 }
  it { is_expected.to have_field(:hp).of_type(Integer) }
  it { expect(subject.hp).to be > 0 }
  it { is_expected.to have_field(:attack).of_type(Integer) }
  it { expect(subject.attack).to be > 0 }
  it { is_expected.to have_field(:defense).of_type(Integer) }
  it { expect(subject.defense).to be > 0 }
end
