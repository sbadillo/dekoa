## Dekoa project first steps

This project has two branches:
	
- **sources**: is where the content is created and where the site is modified. Is from where the build is launched and the main working branch.
- **master**: is the 'dist' folder. This is the output from pelican, and the published side of the repository.


# Travis and gh-pages autodeployment [![Build Status](https://travis-ci.org/sbadillo/dekoa.svg?branch=master)](https://travis-ci.org/sbadillo/dekoa)

This set-up will automatically build the site using Travis-ci. The build is trigered every time a push is done to the sources branch.

1. **Create an orphan branch** 'sources' for project source.

        git checkout -b master
        git checkout --orphan sources
        git push -u <this repo remote address> sources
	
2. **.gitignore some folders** not really needed by pelican:
	
        /output
		/themes/simple-boot/node_modules
        /themes/simple-boot/bower_components
        # any other extra stuff.

3. **Preparation for deploying**:

	- Set SITE_URL to end site url in pelicanconf.py.
    - Make sure all .html files start with "./" (relative paths).

#### **Configure Travis**

1. Create a github token from github.com > profile > settings > tokens. Encrypt it using travis. Install travis if needed through ruby gems. Copy generated encrypted token.

        gem install travis
        travis encrypt GH_TOKEN=<paste github token here>
    
2. Create a travis configuration file .travis.yml which tells travis how to build
    
        ```
        language: python
        python:
          - "3.5"
        sudo: required
        notifications:
          email:
            recipients:
              <email>@email.com
            on_success: never # default: change
            on_failure: always # default: always
        branches:
          only:
          - sources
        env:
          global:
            secure: "<paste encrypted token>"
        install:
        - pip install -r requirements.txt
        script:
        - make publish github

        ```	

3. **Create a requirements.txt** file. As stated in the .travis.yml file, Travis will install these using pip:

		```
        pelican>=3.6.3
        Markdown>=2.6.5
        MarkupSafe>=0.23
        Typogrify
        Pygments>=2.0.2
        ghp-import>=0.4.1
        Unidecode>=0.04.18
        colorama>=0.2.5
        oauth>=1.0.1
        pelican-gist>=0.3
        Jinja2>=2.8
        webassets
        ```

4. **Make a small change at Pelican's Makefile**. Specifically at the *github: publish* section. It should look like this:

		github: publish
	
			ghp-import -n $(OUTPUTDIR) -b master -m "Generated by Travis"	
			git push -fq https://${GH_TOKEN}@github.com/$(TRAVIS_REPO_SLUG).git master

This will use ghp-import to commit only the output folder to the master branch. Then it will (force-) push to github using our token. It will overwrite all the content of master branch each time.

---
#### Pelican plugins
Pelican plugins where added as a submodule:

        git submodule --add https://github.com/getpelican/pelican-plugins.git

Travis automatically updates the submodule on each build




---
## Theme development
Instructions for theme development are in theme/simple-boot folder. Node and bower are used. Task are automated with gulp. 

	npm install
    bower install
