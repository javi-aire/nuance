/**
* Import necessary plugins
*/
import gulp from 'gulp';
import browser from 'browser-sync';
import htmlMin from 'gulp-htmlmin';
import cssMin from 'gulp-clean-css';
import imgMin from 'gulp-imagemin';
import jsMin from 'gulp-uglify';
import seq from 'run-sequence';
import babel from 'gulp-babel';

/**
* Object map of paths for use with tasks
*/
const paths = {
  js: './js/**/*.js',
  images: './images/**/*',
  html: './*.html',
  css: './css/**/*.css',
  dest: 'dist'
};

/**
* compile/minify css files
*/
gulp.task("css", () => {
  return gulp.src(paths.css)
      .pipe(cssMin())
      .pipe(gulp.dest(`${paths.dest}/css`))
      .pipe(browser.reload({
        stream: true
      }));
});

/**
* minify html but compiles css first
*/
gulp.task('html', ['css'], () => {
  return gulp.src(paths.html)
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest(`${paths.dest}/`));
});

/**
* minify images
*/
gulp.task('images', () => {
  return gulp.src(paths.images)
    .pipe(imgMin())
    .pipe(gulp.dest(`${paths.dest}/images`));
});

/**
* compile and minify JS (even though there isn't any)
*/
gulp.task('babel', () => {
  return gulp.src(paths.js)
    .pipe(babel())
    .pipe(jsMin())
    .pipe(gulp.dest(`${paths.dest}/js`));
});


/**
* watch js, html, scss files for changes
* compiles/minifies all on any change
*/
gulp.task('watch', ['serve'], () => {
  gulp.watch(paths.css, ['css', browser.reload]);
  gulp.watch(paths.html, ['html', browser.reload]);
  gulp.watch(paths.js, ['babel', browser.reload]);
});


/**
* serve on port 3000 from base directory dist/
* also exposes node_modules to dist so nothing will break :)
*/
gulp.task('serve', () => {
  browser({
    port: process.env.PORT || 8000,
    ghostMode: false,
    open: false,
    server: {
      baseDir: `${paths.dest}/`,
      routes : {
        './node_modules': './node_modules'
      }
    }
  });
});


/*
* uses run-sequence to run every task in order
*/
gulp.task('build', () => {
  return seq('css', 'html','images', 'babel', 'watch');
});


/*
* default task -- calls the build command
*/
gulp.task('default', (done) => {
  seq('build', done);
});