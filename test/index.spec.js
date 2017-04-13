'use strict'

const index = require('../index')
const supertest = require('supertest')

describe('webhook', () => {
  it('should invoke hello.sh', (done) => {
    const request = supertest(index)

    const payload = JSON.stringify({
      "id":221266925,
      "repository":{
        "id":12978081,
        "name":"ci-test",
        "owner_name":"vangie",
        "url":null
      },
      "number":"1",
      "config":{
        "language":"generic",
        "notifications":{
          "webhooks":["http://requestb.in/tkn5gqtk"]
        },
        ".result":"configured",
        "group":"stable",
        "dist":"precise"
      },
      "status":0,
      "result":0,
      "status_message":"Passed",
      "result_message":"Passed",
      "started_at":"2017-04-12T08:49:39Z",
      "finished_at":"2017-04-12T08:50:08Z",
      "duration":29,
      "build_url":"https://travis-ci.org/vangie/ci-test/builds/221266925",
      "commit_id":63794512,
      "commit":"3e95ab9ec034409bbe2780459ae624b3d8aee327",
      "base_commit":null,
      "head_commit":null,
      "branch":"master",
      "message":"Create README.md",
      "compare_url":"https://github.com/vangie/ci-test/compare/4befd4a0bab8...3e95ab9ec034",
      "committed_at":"2017-04-12T08:49:25Z",
      "author_name":"Vangie Du",
      "author_email":"duwan@live.com",
      "committer_name":"GitHub",
      "committer_email":"noreply@github.com",
      "matrix":[
        {
          "id":221266926,
          "repository_id":12978081,
          "parent_id":221266925,
          "number":"1.1",
          "state":"finished",
          "config":{
            "language":"generic",
            "notifications":{
              "webhooks":["http://requestb.in/tkn5gqtk"]
            },
            ".result":"configured",
            "group":"stable",
            "dist":"precise",
            "os":"linux"
          },
          "status":0,
          "result":0,
          "commit":"3e95ab9ec034409bbe2780459ae624b3d8aee327",
          "branch":"master",
          "message":"Create README.md",
          "compare_url":"https://github.com/vangie/ci-test/compare/4befd4a0bab8...3e95ab9ec034",
          "started_at":"2017-04-12T08:49:39Z",
          "finished_at":"2017-04-12T08:50:08Z",
          "committed_at":"2017-04-12T08:49:25Z",
          "author_name":"Vangie Du",
          "author_email":"duwan@live.com",
          "committer_name":"GitHub",
          "committer_email":"noreply@github.com",
          "allow_failure":false
        }
      ],
      "type":"push",
      "state":"passed",
      "pull_request":false,
      "pull_request_number":null,
      "pull_request_title":null,
      "tag":null
    })

    request.post('/')
      .set({
        'Travis-Repo-Slug': 'vangie/ci-test',
        'Signature': 'lSm9WmdQPbcx3bn7OFPn0/H0YlyVmeorqeUP/V4My/363e0p/iCjPaaB6Tqn9co8GZPtu/OumM3xDSWgO4iNpSyTZ1mh81j4E5PbtsDnh3J3fGh0Y+baTqlxeLGXYqaA7ZkPNOXrNj/RJIrV8l1VNZ8aL8bQX5zL0ihn012uRd/ABwSQH4F0OjQWLOEzHB3mol/ysS80xmHJB+DJCukFxhtXKloY/wucJujy1FZ1bjXXYf8mSLmIi0Hzg01Pa9RJzkoAkssCEz2rd8Kt9v7KeN6RZ63OCnt4vd6nBQzXYhVkcyosckmcAiFC0rjE4w1vNsTa6sLecCcwXl+wP+kPjQ=='
      })
      .type('form')
      .send({ payload: payload })
      .expect(200)
      .end((err, res) => {
        if (err) {
          // console.log(res)
          return done(err);
        }
        return done();
      })
    }
  )}
)
