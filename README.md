## Dekoa project first steps

Instructions for theme development are in theme folder.

## How this was configured at first using travis and gh-pages:

1. **Create an orphan branch** 'sources' for project source.

        git checkout -b master
        git checkout --orphan sources
        git push -u <this repo remote address> sources

2. **Preparation for deploying**:

	- Set SITE_URL to end site url in pelicanconf.py.
    - Make sure all .html files start with "./" (relative paths).

3. **Configure Travis**

3.2. Create a github token from github.com > profile > settings > tokens. Encrypt it using travis. Install travis if needed through ruby gems. Copy generated encrypted token.

        gem install travis
        travis encrypt GH_TOKEN=<paste github token here>
    
3.1 Create a travis configuration file .travis.yml which tells travis how to build
    
        ```
        language: python
        python:
          - "3.5"
        sudo: required
        notifications:
          email:
            recipients:
              <email>@gmail.com
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


    2.4. Make sure all python pelican-related packages are mentioned in requirements.txt. This will be installed using pip.

	2.5. add output to .gitignore, and other big folders: 
	node modules, bower components, etc.
