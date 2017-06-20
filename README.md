## Dekoa project first steps

Instructions for theme development are in theme folder.


## How this was configured at first using travis and gh-pages:

1. exit master branch and created an orphan 'sources' branch for project source.
    
    	git checkout -b master

        git checkout --orphan sources
    
        git push -u <this repo remote address> sources
	

2. configure travis

    2.1. configuration of travis build is in .travis.yml
	
	2.2. create a github token from github and encrypt it.
	create it in github settings. 
	
	2.3. Then encrypt token, copy token and paste as global variable in .travis.yml file

		travis encrypt GH_TOKEN=<token>


    2.4. Make sure all python pelican-related packages are mentioned in requirements.txt. This will be installed using pip.

	2.5. add output to .gitignore, and other big folders: 
	node modules, bower components, etc.
