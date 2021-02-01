var AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });
var bucketName = process.env.AWS_BUCKET_NAME;

const awsUploadFile = (file) => {
  var upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: bucketName,
      Key: file.name,
      Body: file.data,
    },
  });

  var promise = upload.promise();
  promise.then(
    function (data) {
      console.log("Successfully uploaded photo.");
    },
    function (err) {
      console.log("There was an error uploading your photo: ", err.message);
    }
  );
};

module.exports = awsUploadFile;
