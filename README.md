# Travis CI webhook

travis-ci-webhook listens to incomming HTTP POST-request from traivs-ci.org and triggers your specified scripts.
It is a docker container wrap of [travisci-webhook-handler](https://github.com/chrisjaure/travisci-webhook-handler).

# Running

```sh
docker run -d \
  -p 7777:7777 \
  -v ${PWD}/scripts://usr/src/app/scripts \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --name travis-ci-webhook \
  vangie/travis-ci-webhook
```
