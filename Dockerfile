FROM ruby:2.6.6
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y nodejs && apt install yarn
RUN gem install rails -v 6.0.3
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
COPY . /app
RUN yarn install --no-lockfile
RUN bundle install
RUN rails webpacker:install
RUN rails webpacker:install:react
RUN rails generate react:install
EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]


