#!/usr/bin/env bash
set -e

CURRENT_DIR=${WORKSPACE:-"$(dirname $(readlink -f "$0"))"}
BASE_DIR=${WORKSPACE:-"$(dirname "$CURRENT_DIR")"}

SCREEN_NAME=gatsby-source-pixiv-develop

cleanup() {
    screen -S $SCREEN_NAME -X quit > /dev/null 2>&1
}
trap cleanup SIGINT
trap cleanup EXIT

screen -dmS $SCREEN_NAME bash -c "cd \"$BASE_DIR\" && yarn watch"
cd "$CURRENT_DIR" && yarn gatsby:develop
