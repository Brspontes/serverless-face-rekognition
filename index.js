const Aws = require('./src/aws')
const Handler = require('./src/handler')

module.exports.handler = async (event) => {
  const aws = new Aws()
  const handler = new Handler({ awsRekognitionService: aws.awsReko() })

  const { bucket, face1, face2 } = event.queryStringParameters

  const returnedValues = await handler.compareFaces({
    bucket: bucket,
    firstImage: face1,
    secondImage: face2,
  })
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        confidence: `A imagem tem uma taxa de diferença de ${returnedValues.differences}%`,
        similarity: `A imagem tem uma taxa de similaridade de ${returnedValues.similar}%`,
      },
      null,
      2
    ),
  }
}
