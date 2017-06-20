# global stuff done:

If not there install gulp and bower globally.

	sudo npm install gulp -g
	sudo npm install bower -g
	sudo npm install browser-sync -g
	sudo npm install gulp-run -g

## 1. Get the basics, Initialize inside project folder.

Initialize npm inside project.
this creates a packages.json file.

	npm init

Initialize bower. 
This creates bower.json file.

	bower init

Install gulp and other plugins in project using npm. 
Using --save-dev (-D) option, saves the dependency to our packages.json file.

	npm install gulp -D  		// main gulp program
	npm install gulp-sass -D		// plugin to compile sass/scss
	npm install gulp-run -D

## 2. Start getting components:

Get bootstrap 4 using bower.
This will download bootstrap and boostrap dependencies (jquery and tether) into the bower_components folder.

	bower install bootstrap@4


## Configure Gulp

Create a gulpfile.js in project folder

	touch gulfile.js

Tasks of gulpfile:
1. watch changes in folder source/scss
	if change occurs, compile sass, copyjs files and run Pelican
	
1.1 copy css and js files from bower_components to static/ folder
1.2 compile scss bootstrap to static/css
1.3 run pelican -d





