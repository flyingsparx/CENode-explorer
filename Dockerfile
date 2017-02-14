FROM debian:jessie

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs

RUN mkdir /app

ADD package.json /app
ADD app.js /app
ADD index.html /app
ADD src/ app/src
ADD static/ /app/static
ADD webpack.config.js /app
ADD webpack-production.config.js /app

WORKDIR /app
RUN /usr/bin/npm install
RUN /usr/bin/npm run build

EXPOSE 3000

CMD /usr/bin/nodejs app.js
