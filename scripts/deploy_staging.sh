#!/bin/sh

git checkout develop
git checkout -b deploy

gulp build
git add .
git commit -m "New build on $(date +"%Y-%m-%d at %T")" -a
git push staging -f deploy:master

rm -rf dist/

git checkout develop

git branch -D deploy

