#!/usr/bin/env bash

rsync -e ssh -a -r --delete --delete-excluded --progress --compress --chmod=u=rwx,go=rx --exclude-from 'rsync-exclude.txt' ./_site thousand:/home/thousand/public_html
