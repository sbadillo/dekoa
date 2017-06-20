## Dekoa project first steps

Instructions for theme development are in theme folder.

How this was deployed to gh-pages:

1. exit master branch and created a source branch for project
    
    git checkout -b master
    git checkout source
    git push <this repo remote address> source

2. configure travis 
    
    - Requirements for travis build are in requirements.txt
    - configuration of travis build is in .travis.yml
