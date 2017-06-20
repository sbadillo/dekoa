## Dekoa project first steps

Instructions for theme development are in theme folder.

## How this was configured at first using travis and gh-pages:

1. **Create an orphan branch** 'sources' for project source.
    
    	git checkout -b master
        git checkout --orphan sources
        git push -u <this repo remote address> sources

2. **Configure travis**


	2.2. Create a github token from github settings and encrypt it using travis. Install travis if needed through ruby gems. Copy generated encrypted token.
    
    	gem install travis
    	travis encrypt GH_TOKEN=<paste github token here>
    

	2.1 Configuration of travis build is in .travis.yml
    
    ```
    language: python
    python:
      - "3.5"
    sudo: required
    notifications:
      email:
        recipients:
          email@email.com
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
