var gulp = require('gulp');
var sass = require('gulp-sass');
// var run = require('gulp-run');
var exec = require('child_process').exec;
var browserSync = require('browser-sync').create();


gulp.task('default', ['copycss','copyjs','sass', 'runPelican'], function(){});

// compile sass into CSS 
gulp.task('sass', function() {
	return gulp.src('./source/scss/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./static/css'))
});

// copy css files from their original place
gulp.task('copycss', function() {
	return gulp.src([
		'./bower_components/font-awesome/css/font-awesome.min.css',
		])
	.pipe(gulp.dest('./static/css/'));
});

//copy js files from their original place.
gulp.task('copyjs', function() {
	return gulp.src([
		'./bower_components/jquery/dist/jquery.min.js',
		'./bower_components/tether/dist/js/tether.min.js',
		'./bower_components/bootstrap/dist/js/bootstrap.min.js',
		'./source/js/*.js'])
	.pipe(gulp.dest('./static/js/'));
});

gulp.task('runPelican', function (cb) {
	exec( 'pelican -d', { cwd: '../..'
}, function (err, stdout, stderr) {
	console.log(stdout);
	console.log(stderr);
	cb(err);
});
});	



// Watch changes and apply all

gulp.task('watch', function() {
	gulp.watch(["./source/**/*.*","./templates/*.html"],	['default']);
});

// Serve, Watch and browserSync task

// Static Server + watching scss/html files
gulp.task('serve', ['default'], function() {

	browserSync.init({
		server: "../../output"
	});

	// first, run all default tasks if sources change
	// run also pelican
	gulp.watch(["./source/**/*.*","./templates/*.html"],	['default']);
	
	// when changes arrive to output folder, refresh browser
	gulp.watch("../../output/**/*.*").on('change', browserSync.stream());
});

