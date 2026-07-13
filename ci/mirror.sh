#!/bin/bash

REPO_PATH="${PROJECT_HOME}/aristochat/"

cd "${REPO_PATH}"
git pull --rebase origin main
git push -f github main
exit 0
