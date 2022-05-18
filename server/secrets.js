
cloudinary.config({
    cloud_name: 'sample',
    api_key: '874837483274837',
    api_secret: 'a676b67565c6767a6767d6767f676fe1',
    secure: true
  });

  /**
   * The following simple example shows the single line of code needed to upload an image from the remote URL https://www.example.com/mysample.jpg, and set its public_id (identifier) as sample_woman using any of our backend SDKs or the REST API:
   *
   * (below is for node)
   *
   cloudinary.v2.uploader.upload("https://www.example.com/mysample.jpg",
  { public_id: "sample_woman" },
  function(error, result) {console.log(result); });

When using the Node.js SDK, keep these guidelines in mind:

Parameter names: snake_case. For example: public_id
Classes: PascalCase. For example: PreloadedFile
Methods: snake_case. For example: image_upload_tag
Pass parameter data as: Object


   */