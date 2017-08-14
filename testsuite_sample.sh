#!/usr/bin/env bash
set -e

locales="en de"
for loc in $locales; do
  echo "Starting EasyDriver with locale: $loc"
  EASYD_LOCALE=$loc ./node_modules/.bin/mocha testsuite_sample
done
