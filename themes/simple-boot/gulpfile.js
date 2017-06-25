// This gulp file is for theme development:
//
// default tasks:  compiles sass(bootstrap+custom) to static folder
// 								copy necessary css and js from bower components to static folder
//								runs Pelican 				
//
// serve task: 		runs a server at localhost:3000. 
//								performs default tasks on folder changes
//								updates browser when change occur

var gulp = require('gulp');
var sass = require('gulp-sass');
var exec = require('child_process').exec;
var browserSync = require('browser-sync').create();
var modernizr = require('gulp-modernizr');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');


gulp.task('default', ['sass','copycss', 'modernizr', 'runPelican'], function(){});

// ---
// Compile sass into CSS 

gulp.task('sass', function() {
	return gulp.src('./source/scss/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./static/css'))
});

// ---
// copy vendor css files from their original place

gulp.task('copycss', ['sass'], function() {
	return gulp.src([
		'./bower_components/font-awesome/css/font-awesome.min.css',
		'./bower_components/magnific-popup/dist/magnific-popup.css'
		])
	.pipe(gulp.dest('./static/css/'));
});


// ---
// Copy vendor js files from their original place.

gulp.task('copyjs', function() {
	return gulp.src([
		'./bower_components/jquery/dist/jquery.min.js',
		'./bower_components/tether/dist/js/tether.min.js',
		'./bower_components/bootstrap/dist/js/bootstrap.min.js',
		'./bower_components/jcarousel/dist/jquery.jcarousel.min.js',
		'./bower_components/jcarouselLazyLoading/dist/jquery.jcarousel-lazyloading.min.js',
		'./bower_components/jcarousel-swipe/dist/jquery.jcarousel-swipe.min.js',	
		'./bower_components/magnific-popup/dist/jquery.magnific-popup.min.js',	
		'./source/js/*.js'])
	// .pipe(uglify())   // i dont know why this is slowing things down.
	.pipe(concat('all.js'))
	.pipe(gulp.dest('./static/js/'));
});

// ---
// Run through js code and look for modernizr needs.

gulp.task('modernizr', ['copyjs'], function() {
	gulp.src('static/js/*.js')
	.pipe(modernizr( 'modernizr-custom.min.js', {
		"crawl": false,
		"customTests": [],
		"tests": [
		"csstransforms",
		"csstransforms3d",
		"csstransitions"
		],
		"options": [
		"domPrefixes",
		"prefixes",
		"testAllProps",
		"testProp",
		"testStyles",
		"setClasses"
		],
	}) )
	.pipe(uglify())
	.pipe(gulp.dest("./static/js/"))
});


gulp.task('runPelican', function (cb) {
	exec( 'pelican -d', { cwd: '../..'
}, function (err, stdout, stderr) {
	console.log(stdout);
	console.log(stderr);
	cb(err);
});
});	

// Simple watch and apply changes task
gulp.task('watch', function() {
	gulp.watch(["./source/**/*.*","./templates/*.html"],	['default']);
});


// ######################################
// Main Serve, Watch and browserSync task
// ######################################


// auxiliary task to ensure browserSync runs after default is done.
gulp.task('reload-browser', ['default'], function(){
	// when changes arrive to output folder, refresh browser
	browserSync.reload()
});

// main 
gulp.task('serve', ['default'], function() {

	// initialize server at localhost:3000
	
	browserSync.init({
		server: "../../output"
	});
	
	// run all default tasks if sources change,
	// then reload browser
	
	gulp.watch([
		"../../pelicanconf.py",
		"./source/**/*.*",
		"./templates/*.html",
		"../../content/**/*.*"
		], ['reload-browser']);
	
});

