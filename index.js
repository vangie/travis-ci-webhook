'use strict'

const dotenv = require('dotenv')
const fs = require('fs')
const http = require('http')
const fileExists = require('file-exists').sync
const pathJoin = require('path').join
const spawnSync = require('child_process').spawnSync

dotenv.config()
if(fileExists('.env.override')){
  const envConfig = dotenv.parse(fs.readFileSync('.env.override'))
  for (var k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

const createHandler = require('travisci-webhook-handler')
const handler = createHandler({ path: '/', public_key: process.env.TRAVIS_PUBKEY })
const hooks = require('./scripts')

const app = http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(process.env.PORT)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('success', function (event) {
  const payload = event.payload;
  console.log('Build %s success for %s branch %s',
    payload.number,
    payload.repository.name,
    payload.branch);
  const script = hooks[`${payload.repository.owner_name}/${payload.repository.name}`]
  if(script){
    const scriptsPath = pathJoin(__dirname, './scripts/')
    let cmd, args;
    [cmd, ...args] = script.split(' ')

    const filePath = scriptsPath + cmd

    if (!fileExists(filePath)) {
      console.error(`File: ${filePath} does not exist`)
    } else {
      spawnSync(filePath, args, {stdio: 'inherit'})
    }
  }
})

handler.on('failure', function (event) {
  const payload = event.payload;
  console.log('Build %s failed for %s branch %s',
    payload.number,
    payload.repository.name,
    payload.branch)
})

handler.on('start', function (event) {
  const payload = event.payload;
  console.log('Build %s started for %s branch %s',
    payload.number,
    payload.repository.name,
    payload.branch)
})

module.exports = app
