# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::PokemonsController, type: :controller do
  describe 'GET #index' do
    subject { get :index, params: pagination }
    let!(:pokemon) { create_list(:pokemon, 3) }

    context 'when limit and offset are not specified' do
      let(:pagination) { {} }
      it 'returns a json containing all the registered pokemon' do
        subject
        expect(response).to be_successful
        expect(response.body).to include(pokemon.to_json)
      end
    end

    context 'when limit and/or offset are specified' do
      let(:pagination) { { offset: 1, limit: 1 } }
      it 'returns a json containing only the desired records' do
        subject
        expect(response).to be_successful
        expect(response.body).to include(pokemon.second.to_json)
        expect(response.body).to_not include(pokemon.first.to_json)
        expect(response.body).to_not include(pokemon.last.to_json)
      end
    end
  end

  describe 'GET #show' do
    subject { get :show, params: { id: pokemon } }

    context 'when the name of an existing pokemon is given' do
      let(:pokemon) { create(:pokemon).name }
      it 'returns a json with all the information about the pokemon' do
        subject
        expect(response).to be_successful
        expect(response.body).to include(pokemon.to_json)
      end
    end
    context 'when an invalid identifier is given' do
      let(:pokemon) { { id: 'invalid' } }
      it 'returns not found' do
        subject
        expect(response.body).to include('No Pokemon was found with the given name')
        expect(response).to have_http_status :unprocessable_entity
      end
    end
  end
end
