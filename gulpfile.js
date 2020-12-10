const gulp        = require('gulp'),
      htmlmin     = require('gulp-htmlmin'),
      browserSync = require('browser-sync'),
      sass        = require('gulp-sass'),
      rename      = require("gulp-rename"),
      autoprefixer= require('gulp-autoprefixer'),
      cleanCSS    = require('gulp-clean-css'),
      imagemin = require('gulp-imagemin');

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});      

gulp.task('minify-html', () => {
  return gulp.src('src/html/*.html')
    .pipe(htmlmin({ 
        removeComments: true  
    }))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});

gulp.task('compressImg', function() {
    gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
  });

gulp.task('styles', function() {
    return gulp.src("src/styles/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            suffix: ".min",
        }))
        .pipe(autoprefixer({
            overrideBrowserslist:  ['last 2 versions'],
            cascade: false
        }))//префиксы где нужно
        .pipe(cleanCSS({compatibility: 'ie8'}))//очищается css
        .pipe(gulp.dest("build/css"))//вывод в .css
        .pipe(browserSync.stream());//обновление стр
});

gulp.task('watch', function() {
    gulp.watch("src/styles/**/*.+(scss|sass)", gulp.parallel('styles'), browserSync.reload);
    gulp.watch("src/html/*.html", gulp.parallel('minify-html'),browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'compressImg'));