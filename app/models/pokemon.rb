# frozen_string_literal: true

class Pokemon
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  field :base_experience, type: Integer
  field :sprite, type: String

  validates :name,
            :base_experience,
            :sprite, presence: true

  validates :base_experience, numericality: { greater_than: 0, only_integer: true }
end
