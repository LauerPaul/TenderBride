var gulp = require('gulp'),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	watch = require("gulp-watch"),
	gulpPugBeautify = require('gulp-pug-beautify'),
	uncss = require('gulp-uncss'),
	livereload = require('gulp-livereload'),
	cssbeautify = require('gulp-cssbeautify'),
	sassbeautify = require('gulp-sassbeautify'),
	csscomb = require('gulp-csscomb');

var source = 'app/',
	dest = 'public/';
// Bootstrap scss source
var bootstrapSass = {
		in: './bower_components/bootstrap-sass/'
	};
// fonts
var fonts = {
		in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
		out: dest + 'fonts/'
	};
// css source file: .scss files
var css = {
	in: source + 'scss/main.scss',
	out: dest + 'css/',
	watch: source + 'scss/**/*',
	sassOpts: {
		outputStyle: 'nested',
		precison: 3,
		errLogToConsole: true,
		includePaths: [bootstrapSass.in + 'assets/stylesheets']
	}
};
// uncss
gulp.task('uncss', function () {
	return gulp.src('public/css/main.css')
		.pipe(uncss({
			html: ['public/index.html'],
			options: {
				ignore: ['@keyframes pulsate']
			}
		}))
		.pipe(gulp.dest('public/css/'));
});

// copy bootstrap required fonts to dest
gulp.task('fonts', function () {
	return gulp
		.src(fonts.in)
		.pipe(gulp.dest(fonts.out));
});
// compile scss
gulp.task('sass', ['fonts'], function () {
	return gulp.src(css.in)
		.pipe(sass(css.sassOpts))
		.pipe(gulp.dest(css.out))
});
// JADE (PUG)
gulp.task('pug', function () {
  return gulp.src(source + 'template/profile-man.pug')
	.pipe(gulpPugBeautify({ omit_empty: true }))
	.pipe(pug({pretty: true}))
	.pipe(gulp.dest(dest))
});
//CSS BEAUTIFY
gulp.task('cssbeautify', function() {
	return gulp.src('./public/css/*.css')
		.pipe(cssbeautify({
			autosemicolon: true
		}))
		.pipe(gulp.dest('./public/css/'));
});
// css COMB
gulp.task('csscomb', function() {
	return gulp.src('./public/css/*.css')
		.pipe(csscomb())
		.pipe(gulp.dest('./public/css/'));
});

// default task
gulp.task('default', ['sass', 'pug'], function () {
	 gulp.watch(css.watch, ['sass']);
	 gulp.watch(source+'template/**/*.pug', ['pug']); 
});
