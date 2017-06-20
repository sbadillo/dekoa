## Dekoa project first steps

Instructions for theme development are in theme folder.


## How this was configured at first using travis and gh-pages:

1. exit master branch and created an orphan 'sources' branch for project source.
    
    git checkout -b master
    git checkout --orphan sources
    git push -u <this repo remote address> sources



2. configure travis 
    
    - Requirements for travis build are in requirements.txt
    - configuration of travis build is in .travis.yml
