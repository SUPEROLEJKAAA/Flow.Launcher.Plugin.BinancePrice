// import axios from "axios";
// import fs from "fs";
// import {config} from "./config.js";
// import {processData, priceDifference} from "./helpers.js";
//
// const apiUrl  = 'https://api.binance.com/api/v3/ticker/price'
// const iconsPath = '.\\icons\\'
// const [count, query] = processData('10 BTC')
// const { data } = await axios.get(apiUrl)
// const searchCoin = query + 'USDT'
// const filtered = data.filter((coin) => coin.symbol === searchCoin.toUpperCase())
// if (filtered.length === 1) {
//     console.log(getResult(filtered[0], 1))
// }
//
// export function getResult(coin, count) {
//     const coinName = coin.symbol.replace('USDT', '');
//     const price = parseFloat(coin.price)
//     const diff = priceDifference(coinName, price)
//     let iconPath = config.iconsPath + 'app.png'
//     if (fs.existsSync(`${config.iconsPath}${coinName}.png`)) {
//         iconPath = `${config.iconsPath}${coinName}.png`
//     }
//     return [
//         {
//             title: `${count} ${coinName} | $${count * price} ${diff}`,
//             subtitle: 'Copy to buffer',
//             method: 'copy_result',
//             params: [`${count} ${coinName} | $${price * count}`],
//             iconPath
//         },
//         {
//             title: `${coinName} | USDT`,
//             subtitle: `Open on Binance`,
//             method: 'open_result',
//             params: [`https://www.binance.com/ru/trade/${coinName}_USDT?type=spot`],
//             iconPath
//         }
//     ];
// }

// const diff = 0.00000843 - 0.00000841
// function getSymbolCount(diff) {
//     const numbersAfterPoint = diff.toFixed(20).split(".")[1]
//     let symbolCount = 0
//     for (let i = 0; i <= numbersAfterPoint.length; i++) {
//         if(numbersAfterPoint[i] !== '0') {
//             symbolCount = i + 1
//             break
//         }
//     }
//     return diff.toFixed(symbolCount)
// }
// console.log(diff)
// console.log(getSymbolCount(diff))

function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16).toUpperCase();
    });
}

// Пример использования
console.log(generateGUID());