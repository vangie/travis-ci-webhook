FROM node:7-alpine

EXPOSE 7777

# Install docker
RUN set -ex && \
    if [ $(wget -qO- ipinfo.io/country) == CN ]; then echo "http://mirrors.aliyun.com/alpine/latest-stable/main/" > /etc/apk/repositories ;fi && \
    apk add --update --no-cache docker py-pip bash && \
    pip install docker-compose

ADD . /usr/src/app/
RUN yarn

CMD ["yarn", "start"]
