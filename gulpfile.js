var gulp = require('gulp');
var watch = require('gulp-watch');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var reactify = require('reactify');
var log = require('gulplog');
var runSequence = require('run-sequence').use(gulp);
var clean = require('gulp-clean');
var del = require('del'); // rm -rf


var defaults = {
    app: '.',
    src: 'src',
    dev: 'dist',
    dist: 'dist'
};

/* CLEAN DEV */
gulp.task('clean:dev', function() {
    return del.sync([defaults.dev]);
});



// gulp.task("bundle:js", function() {
//     return gulp.src(defaults.src + "/js/**/*.js")
//         .pipe(sourcemaps.init())
//         .pipe(babelify({
//             presets: ['env'],
//           plugins: ["transform-object-assign", "rewire", "lodash", "inline-replace-variables", "transform-object-rest-spread"]
//         }))
//         .pipe(concat("main.js"))
//         .pipe(sourcemaps.write("."))
//         .pipe(gulp.dest("dist/js"));
// });

gulp.task('bundle:js', function() {
    // app.js is your main JS file with all your module inclusions
    return browserify({ entries: './src/js/main.js', debug: true })
        .transform("babelify", {
            presets: [
                ["env", {
                    "targets": {
                        "browsers": [
                            'last 5 versions',
                            'not ie < 10'
                        ]
                    }
                }]
            ],
            plugins: ["transform-runtime", "transform-object-assign", "rewire", "lodash", "inline-replace-variables", "transform-object-rest-spread"]
        })
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/js'))
        // .pipe(livereload());
});

/*gulp.task('bundle:js', function() {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: defaults.src + '/js/main.js',
        debug: true,
        // defining transforms here will avoid crashing your stream
        transform: [babelify]
    });

    return b.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', log.error)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(defaults.dist + '/js/'));
});*/

/* SASS WATCH */
gulp.task('watch', function() {
    gulp.watch(defaults.src + '/js/**/*.js', ['bundle:js']);
});


gulp.task('build:dev', function() {
    runSequence('clean:dev', 'bundle:js', 'watch', function() {
        console.log('Waiting for changes...')
    })
});

gulp.task('default', ['build:dev'])