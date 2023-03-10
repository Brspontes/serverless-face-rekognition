const AWS = require('aws-sdk')

class Aws {
  constructor() {}

  awsReko() {
    return new AWS.Rekognition()
  }
}

module.exports = Aws
