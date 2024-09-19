import open from "open";
import axios from "axios";
import {Flow} from "flow-launcher-helper";
import {getResult, processData, copy} from "./helpers.js";
import {config, answer} from './config.js'

const {on, showResult, run, requestParams} = new Flow('..\\icons\\app.png')



on("query", async () => {
    const [count, query] = processData(requestParams[0])
    if (query.length <= 1)
        return showResult(answer.wait);

    try {
        const {data} = await axios.get(`${config.apiURL}`)
        const searchCoin = query + 'USDT'
        const filtered = data.filter((coin) => coin.symbol === searchCoin.toUpperCase())
        if (filtered.length === 1) {
            return showResult(...getResult(filtered[0], count))
        } else {
            return showResult(answer.notFound)
        }
    } catch (err) {
        return showResult(answer.error(err))
    }
});

on("open_result", () => {
    open(requestParams[0])
})

on("copy_result", () => {
    copy(requestParams[0])
})

run()