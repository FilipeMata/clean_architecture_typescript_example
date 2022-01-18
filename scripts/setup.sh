#!/bin/bash
set -e

DIR="$( pwd )"

SRC_DIR="$DIR/src"
DIST_DIR="$DIR/dist"

if [ -f "$DIR/.setup" ]; then
  echo "Project setup already completed"
  exit 0
fi

npm install --prefix $DIR
npm run build --prefix $DIR
npm install -g sequelize-cli@5.5.1

npx sequelize db:migrate --env=store
npx sequelize db:seed:all --env=store

cp "$SRC_DIR/../package.json" "$DIST_DIR"

echo "1" > "$DIR/.setup"
