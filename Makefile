.PHONY: migrate collectstatic runserver

migrate:
	python manage.py migrate --noinput

collectstatic:
	python manage.py collectstatic --noinput

runserver:
	daphne TracCloud.asgi:application

