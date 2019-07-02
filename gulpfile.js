var syntax        = 'sass';

var gulp          = require('gulp'),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		pug 		   = require('gulp-pug'),
		notify        = require('gulp-notify'),
		del = require('del');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
	// browserSync({
	// 	proxy: "domen/index.php",
	// 	notify: false
	// });
});

gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	// .pipe(rename({ suffix: '.min', prefix : '' }))
	// .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/js/common.js',
		])
	.pipe(concat('scripts.js'))
	// .pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }));
});

// HTML
// gulp.task('code', function() {
// 	return gulp.src('app/*.html')
// 	.pipe(browserSync.reload({ stream: true }));
// });

// PUG
gulp.task('pugCompile', function() {
	return gulp.src('app/pug/**/*.pug')
	.pipe(pug({pretty: true}))
	.pipe(gulp.dest('app'))
	.pipe(browserSync.reload({ stream: true }));
});
gulp.task('pugClean', function () {
	return del('app/pug-modules', {force:true});
});
gulp.task('code', gulp.series('pugCompile', 'pugClean'));


gulp.task('watch', function() {
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
	// gulp.watch('app/*.html', gulp.parallel('code'));
	gulp.watch(['app/pug/**/*.pug'], gulp.parallel('code'));
});

gulp.task('default', gulp.parallel('watch', 'styles', 'scripts', 'browser-sync'));