# frozen_string_literal: true

require 'vcr'

VCR.configure do |c|
  c.cassette_library_dir = 'spec/fixtures/vcr_cassettes'
  c.hook_into :webmock
  c.configure_rspec_metadata!
  c.allow_http_connections_when_no_cassette = true

  c.default_cassette_options = { record: :once }

  c.ignore_localhost = true
  c.ignore_hosts 'chromedriver.storage.googleapis.com'

  # Filter Rails secrets that are strings or numbers
  secrets_to_filter = Rails.application.secrets.select do |_key, value|
    value.is_a?(String) || value.is_a?(Numeric)
  end

  secrets_to_filter.each do |key, value|
    c.filter_sensitive_data("<#{key.upcase}>") { value }
    c.filter_sensitive_data("<#{key.upcase}_U>") { CGI.escape(value.to_s) }
  end
end
