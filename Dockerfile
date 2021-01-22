FROM ruby:2.6.6
RUN apt-get update -qq && apt-get install -y nodejs 
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install
COPY . /app
EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]


