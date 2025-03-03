api_compose_file = ./api/.docker/docker-compose.yml
web_compose_file = ./web/.docker/docker-compose.yml

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