import os
from .settings import *

SECRET_KEY = os.environ['DJANGO_SECRET_KEY']

# Configure the domain name using the environment variable
# that Azure automatically creates for us.
ALLOWED_HOSTS = [os.environ['WEBSITE_HOSTNAME']] if 'WEBSITE_HOSTNAME' in os.environ else []
CSRF_TRUSTED_ORIGINS = ['https://' + os.environ['WEBSITE_HOSTNAME']] if 'WEBSITE_HOSTNAME' in os.environ else []
DEBUG = os.environ.get('DJANGO_DEBUG', False) == "True"

# Configure Postgres database based on connection string of the libpq Keyword/Value form
# https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING
db_conn_str = os.environ['AZURE_POSTGRESQL_CONNECTIONSTRING']
db_conn_str_params = {pair.split('=')[0]: pair.split('=')[1] for pair in db_conn_str.split(' ')}
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': db_conn_str_params['dbname'],
        'HOST': db_conn_str_params['host'],
        'USER': db_conn_str_params['user'],
        'PASSWORD': db_conn_str_params['password'],
    }
}

# CACHES SETTING
redis_conn_str = os.environ['AZURE_REDIS_CONNECTIONSTRING']
redis_conn_str_params = {pair.split(':')[0]: pair.split(':')[1] for pair in redis_conn_str.split(' ')}
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': f'rediss://{redis_conn_str_params["host"]}:6380/0',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'PASSWORD': redis_conn_str_params['password'],
            'SSL': True,
        },
    },
}
