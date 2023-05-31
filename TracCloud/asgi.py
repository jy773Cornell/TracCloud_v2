"""
ASGI config for TracCloud project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from notifications import routing
from dotenv import load_dotenv

# Check for the WEBSITE_HOSTNAME environment variable to see if we are running in Azure Ap Service
# If so, then load the settings from production.py
settings_module = 'TracCloud.production' if 'WEBSITE_HOSTNAME' in os.environ else 'TracCloud.settings'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_module)

# Only for Local Development - Load environment variables from the .env file
if 'WEBSITE_HOSTNAME' not in os.environ:
    print("Loading environment variables for .env file")
    load_dotenv('./.env')

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AuthMiddlewareStack(
        URLRouter(
            routing.websocket_urlpatterns
        )
    ),
})
