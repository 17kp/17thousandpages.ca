#!/usr/bin/env bash

## OPTIONS
# -p, --no-ping    Don't ping Google, Bing

PING=1

# http://stackoverflow.com/questions/402377/using-getopts-in-bash-shell-script-to-get-long-and-short-command-line-options/7680682#7680682
optspec=":pgr-:"

while getopts "$optspec" optchar ; do
  case "${optchar}" in
    -)
      case "${OPTARG}" in
        no-ping)
          PING=0
          ;;
      esac;;
    p)
      PING=0
      ;;
  esac
done

rsync -e ssh -a -r --delete --delete-excluded --progress --compress --chmod=u=rwx,go=rx --exclude-from 'rsync-exclude.txt' ./_site/ thousand:/home/thousand/public_html

if [ "$PING" -gt 0 ] ; then
  curl http://www.google.com/webmasters/tools/ping?sitemap=https://17thousandpages.ca/sitemap.xml
  curl http://www.bing.com/webmaster/ping.aspx?siteMap=https://17thousandpages.ca/sitemap.xml
fi
