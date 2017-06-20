var gulp = require('gulp');
var sass = require('gulp-sass');
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
		"./source/**/*.*",
		"./templates/*.html"
		], ['reload-browser']);
	
});

