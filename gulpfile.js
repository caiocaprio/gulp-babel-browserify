var gulp        = require('gulp');

var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var livereload  = require('gulp-livereload');
var reactify = require('reactify');
var log = require('gulplog');

gulp.task("default", function () {
  return gulp.src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babelify({
        presets: ['env'],
        plugins: ['transform-runtime']
        }))
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js"));
});

// gulp.task('build', function () {
//   // app.js is your main JS file with all your module inclusions
//   return browserify({entries: './src/js/main.js', debug: true})
//       .transform("babelify", { presets: ["env"] })
//       .bundle()
//       .pipe(source('main.js'))
//       .pipe(buffer())
//       .pipe(sourcemaps.init({loadMaps: true}))
//       .pipe(uglify())
//       .pipe(sourcemaps.write('./maps'))
//       .pipe(gulp.dest('./dist/js'))
//       .pipe(livereload());
// });

gulp.task('javascript', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './src/js/main.js',
    debug: true,
    // defining transforms here will avoid crashing your stream
    transform: [babelify]
  });

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', log.error)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
});