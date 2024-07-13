const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const scripts = require('./build/scripts');
const images = require('./build/images');
const sync = require('./build/browsersync');

// Define sass task
gulp.task('sass', function() {
  return gulp.src('./_scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

// Apply other tasks
[scripts, images, sync].forEach(task => {
  task(gulp);
});

// Ensure jekyll-build task is defined
gulp.task('jekyll-build', function(done) {
  const spawn = require('child_process').spawn;
  return spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
    .on('close', done);
});

// Define build task
gulp.task('build', gulp.series(['sass', 'scripts', 'images', 'jekyll-build']));
