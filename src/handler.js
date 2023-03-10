class Handler {
  constructor({ awsRekognitionService }) {
    this.awsRekognitionService = awsRekognitionService
  }

  async compareFaces({ bucket, firstImage, secondImage }) {
    try {
      const params = {
        SourceImage: {
          S3Object: {
            Bucket: bucket,
            Name: firstImage,
          },
        },
        TargetImage: {
          S3Object: {
            Bucket: bucket,
            Name: secondImage,
          },
        },
        SimilarityThreshold: 70,
      }
      const returnedValues = await this.awsRekognitionService
        .compareFaces(params)
        .promise()

      return {
        similar: returnedValues?.FaceMatches[0]?.Similarity ?? 0,
        differences: returnedValues?.UnmatchedFaces[0]?.Confidence ?? 0,
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Handler
