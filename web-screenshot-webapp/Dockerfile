FROM ruby:2.7.1-slim-buster as builder

ENV BUNDLE_FROZEN true
ENV BUNDLE_JOBS 4
ENV BUNDLE_PATH /app/vendor/bundle
ENV BUNDLE_WITHOUT development:test

WORKDIR /app

RUN apt-get update \
 && apt-get install -y --no-install-recommends build-essential libsqlite3-dev curl gnupg \
 && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
 && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
 && apt-get update \
 && apt-get install -y --no-install-recommends yarn nodejs

COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN bundle install --verbose

COPY Rakefile Rakefile
COPY bin bin
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY config config
COPY app/assets app/assets
COPY app/javascript app/javascript
RUN RAILS_ENV=production SECRET_KEY_BASE=$(bin/rails secret) bin/rails assets:precompile

FROM ruby:2.7.1-slim-buster as production

ENV PORT 3000
ENV RAILS_ENV production
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true
ENV BUNDLE_PATH /app/vendor/bundle
ENV BUNDLE_WITHOUT development:test

WORKDIR /app

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update \
 && apt-get install -y --no-install-recommends libsqlite3-dev \
 && rm -rf /var/lib/apt/lists/

COPY . /app
COPY --from=builder /app/vendor/bundle vendor/bundle
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/public/assets public/assets
COPY --from=builder /app/public/packs public/packs

RUN bin/rails db:prepare

CMD bin/rails s -b 0.0.0.0 -p $PORT
