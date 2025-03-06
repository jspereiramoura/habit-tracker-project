api_folder := ./api/.docker
web_folder := ./web/.docker
api_compose_file := ${api_folder}/docker-compose.yml
web_compose_file := ${web_folder}/docker-compose.yml

dev-up-web:
	@npm --prefix ./web run dev -- --port 3001
dev-up-api:
	@npm --prefix ./api run start:dev -- --port 3000
dev-up-db:
	@docker-compose -f ${api_compose_file} up -d db

up: up-api up-web
up-web:
	@docker-compose -f ${web_compose_file} up --build -d
up-api:
	@docker-compose -f ${api_compose_file} up --build -d

restart:
	@docker-compose \
		-f ${api_compose_file} \
		-f ${web_compose_file} \
		restart

down:
	@docker-compose \
		-f ${api_compose_file} \
		-f ${web_compose_file} \
		down

kill:
	@docker-compose \
		-f ${api_compose_file} \
		-f ${web_compose_file} \
		kill

rm:
	@docker-compose \
		-f ${api_compose_file} \
		-f ${web_compose_file} \
		rm

replace-env:
	@cp ${api_folder}/.env.sample ${api_folder}/.env && \
	cp ${web_folder}/.env.sample ${web_folder}/.env

replace-dev-env:
	@cp ./api/.env.sample ./api/.env