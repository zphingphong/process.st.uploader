var gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename');

var jsSource = [
  './bower_components/jquery/dist/jquery.min.js',
	'./bower_components/angular/angular.min.js',
	'./bower_components/bootstrap/dist/js/bootstrap.min.js',

  './bower_components/blueimp-load-image/js/load-image.min.js',
  './bower_components/blueimp-canvas-to-blob/js/canvas-to-blob.min.js',

  './bower_components/jquery-file-upload/js/vendor/jquery.ui.widget.js',
  './bower_components/jquery-file-upload/js/jquery.iframe-transport.js',
  './bower_components/jquery-file-upload/js/jquery.fileupload.js',
  './bower_components/jquery-file-upload/js/jquery.fileupload-process.js',
  './bower_components/jquery-file-upload/js/jquery.fileupload-image.js',
  './bower_components/jquery-file-upload/js/jquery.fileupload-audio.js',
  './bower_components/jquery-file-upload/js/jquery.fileupload-video.js',
  './bower_components/jquery-file-upload/js/jquery.fileupload-validate.js',
  './bower_components/jquery-file-upload/js/jquery.fileupload-angular.js',
  './app/**/*.js'
  
];

var cssSource = [
	'./bower_components/bootstrap/dist/css/bootstrap.min.css',
	'./bower_components/bootstrap/dist/css/bootstrap-theme.min.css',

  './bower_components/jquery-file-upload/css/jquery.fileupload.css',
  './bower_components/jquery-file-upload/css/jquery.fileupload-ui.css'
];

var errorHandler = function(){
  var args = Array.prototype.slice.call(arguments);

  if (typeof args[0] === 'string') {
    args[0] = new Error(args[0]);
  }

  console.log({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};

gulp.task('css', function () {
  gulp.src(cssSource)
    .pipe(concat('vendor'))
    .on('error', errorHandler)
    //.pipe(uglify())
    .on('error', errorHandler)
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('js', function () {
  gulp.src(jsSource)
    .pipe(concat('app'))
    .on('error', errorHandler)
    //.pipe(uglify())
    .on('error', errorHandler)
    .pipe(rename({
      extname: ".min.js"
    }))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('templates', function() {
   gulp.src('./app/directives/*.html')
   .pipe(gulp.dest('./public/dist/templates'));
});

gulp.task('fonts', function() {
   gulp.src('./bower_components/bootstrap/fonts/*')
   .pipe(gulp.dest('./public/fonts'));
});

gulp.task('watch', function () {
  gulp.watch(jsSource, ['js']);
});

gulp.task('default', ['js', 'css', 'templates', 'fonts']);