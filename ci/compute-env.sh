#!/usr/bin/env bash

export SERVICE_NAME="ui"
export IMAGE_NAME="aristochat-${SERVICE_NAME}"
export VERSION="$(grep -oE "^[0-9\.]+$" VERSION)"
export VERSION_SHA="${VERSION}-${CI_COMMIT_SHORT_SHA}"
