/*
 |--------------------------------------------------------------------------
 | Required
 |--------------------------------------------------------------------------
 */
var //elixir = require('laravel-elixir'),
    gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber');
    less = require('gulp-less');

/*
|--------------------------------------------------------------------------
| Required
|--------------------------------------------------------------------------
*/
gulp.task('scripts', function() {
  gulp.src(['resources/simple-front/js/**/*.js', '!resources/simple-front/js/**/*.min.js'])
  .pipe(plumber())
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('resources/simple-front/js'));
});

/*
|--------------------------------------------------------------------------
| Less
|--------------------------------------------------------------------------
*/
gulp.task('less', function(){
  gulp.src('resources/simple-front/less/*.less')
  .pipe(less())
  .pipe(plumber())
  .pipe(rename({suffix: '.min'}))
  .pipe(cssmin())
  .pipe(gulp.dest('resources/simple-front/css'))
  .pipe(reload({stream:true}));
});

/*
|--------------------------------------------------------------------------
| HTML
|--------------------------------------------------------------------------
*/
gulp.task('html', function(){
  gulp.src('resources/simple-front/*.html')
  .pipe(reload({stream:true}));
});

/*
|--------------------------------------------------------------------------
| browserSync
|--------------------------------------------------------------------------
*/
gulp.task('browser-sync', function(){
  browserSync({
    server:{
      baseDir: "resources/simple-front"
    }
  })
});

/*
|--------------------------------------------------------------------------
| Watch Tasks
|--------------------------------------------------------------------------
*/
gulp.task('watch', function(){
  gulp.watch('resources/simple-front/js/**/*.js', ['scripts']);
  gulp.watch('resources/simple-front/*.html', ['html']);
  gulp.watch('resources/simple-front/less/*.less', ['less']);
});

/*
|--------------------------------------------------------------------------
| Default Tasks
|--------------------------------------------------------------------------
*/
gulp.task('default', ['scripts','html','less','browser-sync','watch']);
