const { Telegraf } = require('telegraf')
const minimist = require('minimist')
const Jimp = require('jimp')
const jsQR = require('jsqr')


async function tryParse(url) {
    console.log(url)

    const image = await Jimp.read(url)
    // a bit of preprocessing helps on QR codes with tiny details
    image.normalize()
    image.scale(2)
    const value = jsQR(image.bitmap.data, image.bitmap.width, image.bitmap.height)
    if (value) {
        return value.data || String.fromCharCode.apply(null, value.binaryData)
    }
}

async function onPhoto(ctx) {
    try {
        const photos = ctx.message.photo
        console.log(photos)
        const photo = photos[photos.length - 1]
        const fileId = photo.file_id
        const url = await bot.telegram.getFileLink(fileId)
        const result = await tryParse(url)
        if (!result) {
            ctx.reply('No QR code found :(')
        } else {
            ctx.reply(result)
        }
    } catch (error) {
        ctx.reply('' + error)
    }
}


const args = minimist(process.argv)
const token = process.env.BOT_TOKEN || args.token
const bot = new Telegraf(token)
bot.start(ctx => ctx.reply('Welcome. Send an image with QR code'))
bot.on('photo', onPhoto)
bot.launch()
