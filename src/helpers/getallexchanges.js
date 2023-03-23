const {
    getBinanceTicker,
    getBtcTurkTicker,
    getGateTicker,
    getOkexTicker,
    getHuobiTicker,
    getKucoinTicker
} = require("./../exchange");

const getAllExchanges = async () => {
    let ret;
    let binance = new Promise(async (res, rej) => {
        res(await getBinanceTicker());
    });

    let btcTurk = new Promise(async (res, rej) => {
        res(await getBtcTurkTicker());
    });

    let gate = new Promise(async (res, rej) => {
        res(await getGateTicker());
    });

    // let okex = new Promise(async (res, rej) => {
    //     res(await getOkexTicker());
    // });

    let huobi = new Promise(async (res, rej) => {
        res(await getHuobiTicker());
    });

    let kucoin = new Promise(async (res, rej) => {
        res(await getKucoinTicker());
    });

    await Promise.all([binance, btcTurk, gate,  huobi, kucoin]).then((data) => {
        ret = {
            binance: data[0],
            btcTurk: data[1],
            gate: data[2],
            // okex: data[3],
            huobi: data[4],
            kucoin: data[5]
        };
    })

    return ret;
}

module.exports = getAllExchanges;