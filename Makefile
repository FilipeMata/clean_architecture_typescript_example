.PHONY: build up down start stop restart logs ps login

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

debug: down
	DEBUG=1 docker-compose up -d

start:
	docker-compose start

stop:
	docker-compose stop

restart: down up

logs:
	docker-compose logs --tail=10 -f

ps:
	docker-compose ps

login:
	docker-compose run --rm -w /application clean_arquitecture /bin/bash

setup:
	node ./scripts/create-databases.js & docker network create shared-services || true && docker-compose run --rm -w /application clean_arquitecture /bin/bash -c "npm run setup"

database:
	docker run --name dbmysql -e MYSQL_USER=root -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d -t mysql:8.0.18 
