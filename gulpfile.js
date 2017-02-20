var config = {
    accessKeyId: process.env.AWS_accessKey,
    secretAccessKey: process.env.AWS_secretAccessKey
}

var target_bucket = 'bitwrap.io';
var gulp = require('gulp');
var s3 = require('gulp-s3-upload')(config);

gulp.task("upload", function() {
    gulp.src("./bundle.js")
        .pipe(s3({
            Bucket: target_bucket,
            ACL: 'public-read'
        }, {
            maxRetries: 5
        }))
    ;
});
