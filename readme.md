# QR Reader bot for Telegram
 - Node.js
 - [Telegraf](https://github.com/telegraf/telegraf)
 - [Jimp](https://github.com/oliver-moran/jimp)
 - [jsQR](https://github.com/cozmo/jsQR)
 - Dockerized

# Run
Demo instance is running at [@qr3bot](https://t.me/qr3bot)

To run your own instance:
```sh
BOT_TOKEN=your_bot_token node index.js
```
or
```sh
BOT_TOKEN=your_bot_token docker-compose up
```

To run with newrelic monitornig:
```sh
NEW_RELIC_LICENSE_KEY=your_newrelic_key BOT_TOKEN=your_bot_token docker-compose up
```