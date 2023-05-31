import json
from channels.auth import get_user
from channels.generic.websocket import AsyncWebsocketConsumer


class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            user = await get_user(self.scope)

            if user.is_authenticated:
                self.group_name = str(user.id)
                await self.channel_layer.group_add(
                    self.group_name,
                    self.channel_name
                )
                await self.accept()

        except Exception as e:
            print(e)

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        try:
            text_data_json = json.loads(text_data)
            message = text_data_json['message']

            print(f"Received message: {message}")

            await self.channel_layer.group_send(
                self.group_name,
                {
                    'type': 'send_message_to_group',
                    'message': message
                }
            )

        except json.JSONDecodeError:
            print(f"Received non-JSON message: {text_data}")

    async def send_message_to_group(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))
