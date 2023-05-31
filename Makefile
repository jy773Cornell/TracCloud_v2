.PHONY: runserver

runserver:
	python manage.py migrate --noinput
	python manage.py collectstatic --noinput
	daphne TracCloud.asgi:application
