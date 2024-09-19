import fs from "fs";
import childProcess from "child_process";
import {getData, addData} from "./db/db.js";
import {config} from "./config.js";


export function getResult(coin, count) {
    const coinName = coin.symbol.replace('USDT', '');
    const price = parseFloat(coin.price)
    const formattedPrice = formatPrice(price, count)
    const iconPath = getIconPath(coinName)
    let diff =  (count === 1) ? priceDifference(coinName, price) : undefined
    return [
        {
            title: `${count} ${coinName} | $${formattedPrice} ${diff || ''}`,
            subtitle: 'Copy to buffer',
            method: 'copy_result',
            params: [`${count} ${coinName} | $${formattedPrice}`],
            iconPath,
            score: 0
        },
        {
            title: `${coinName} | USDT`,
            subtitle: `Open on Binance`,
            method: 'open_result',
            params: [`https://www.binance.com/ru/trade/${coinName}_USDT?type=spot&ref=87181442`],
            iconPath
        }
    ];
}

export const copy = (content) => {
    childProcess.spawn('clip', {shell: true}).stdin.end(content);
};

export function processData(data) {
    if (data.includes(" ")) {
        const arrayData = data.split(" ")
        arrayData[0] = arrayData[0].replace(',', '.')
        return arrayData
    }
    return [1, data]
}

export function priceDifference(coin, price) {
    const oldPrice = getData(coin)
    addData(coin, price)
    const diff = price - oldPrice
    if (oldPrice === 0 || diff === 0) {
        return 0
    }
    const diffSign = diff > 0 ? "⬆" : "⬇"
    const diffAbs = Math.abs(diff)
    const diffFixed = diffAbs.toFixed(diffAbs >= 1 ? 2 : getSymbolCount(diffAbs))
    return `| ${diffSign} ${diffFixed}`
}

function getSymbolCount(diff) {
    const numbersAfterPoint = diff.toFixed(20).split(".")[1]
    let symbolCount = 0
    for (let i = 0; i <= numbersAfterPoint.length; i++) {
        if(numbersAfterPoint[i] !== '0') {
            symbolCount = i + 1
            break
        }
    }
    return symbolCount
}

function formatPrice(price, count) {
    const countedPrice = price * count
    if (count > 1) {
        const fixedDigits = countedPrice > 100 ? 2 : getSymbolCount(price)
        return countedPrice.toFixed(fixedDigits)
    }
    return countedPrice

}

function getIconPath(coinName) {
    const defaultIconPath = config.iconsPath + 'app.png'
    return fs.existsSync(`${config.iconsPath}${coinName}.png`) ?
        `${config.iconsPath}${coinName}.png` :
        defaultIconPath;
}