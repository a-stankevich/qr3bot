const { Telegraf } = require('telegraf')
const minimist = require('minimist')
const fetch = require('node-fetch');


const args = minimist(process.argv)
const token = process.env.BOT_TOKEN || args.token

const bot = new Telegraf(token)

bot.start((ctx) => ctx.reply('Welcome. Send an image with QR code'))

async function onPhoto(ctx) {
    const photos = ctx.message.photo
    const photo = photos[photos.length - 1]
    const fileId = photo.file_id
    const link = await bot.telegram.getFileLink(fileId)
    const response = await fetch(link)
    const contents = await response.arrayBuffer();
    console.log(link, contents.length)
    ctx.reply('got photo!')
}
bot.on('photo', onPhoto)

bot.launch()
