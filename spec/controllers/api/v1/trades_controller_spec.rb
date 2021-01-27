# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::TradesController, type: :controller do
  before do
    create(:pokemon, name: 'Glaceon')
    create(:pokemon, name: 'Sylveon')
  end

  describe 'GET #index' do
    subject { get :index, params: pagination }
    let!(:trade) { create_list(:trade, 3) }

    context 'when limit and offset are not specified' do
      let(:pagination) { {} }
      it 'returns a json containing all the registered trade' do
        subject
        expect(response).to be_successful
        expect(response.body).to include(trade.to_json)
      end
    end

    context 'when limit and/or offset are specified' do
      let(:pagination) { { offset: 1, limit: 1 } }
      it 'returns a json containing only the desired records' do
        subject
        expect(response).to be_successful
        expect(response.body).to include(trade.second.to_json)
        expect(response.body).to_not include(trade.first.to_json)
        expect(response.body).to_not include(trade.last.to_json)
      end
    end
  end

  describe 'POST #create' do
    subject { post :create, params: { trade: trade } }

    context 'with valid parameters' do
      let(:trade) { attributes_for(:trade) }
      it 'creates a new trade' do
        expect { subject }.to change(Trade, :count).by(1)
        expect(response).to have_http_status :created
      end
    end
  end
end
