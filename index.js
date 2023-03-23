const { getAllExchanges, compare } = require("./src/helpers");
const { getBtcTurkTicker, getGateTicker, getBinanceTicker, getKucoinTicker, getHuobiTicker, getOkexTicker } = require("./src/exchange");
const express = require("express");

const app = express();


app.set('views', './src/views');
app.set('view engine', 'ejs')

const getdata = async() => {
     // SELECT ALL EXCHANGES
     let all = await getAllExchanges();

     //Exchanges, Minimum arbitrage percent default = 1
     let arbitrage = compare(all, 2);


     // Select manuel exchanges
     arbitrage = compare({
         btcTurk: await getBtcTurkTicker(),
         binance: await getBinanceTicker(),
         gate: await getGateTicker(),
         kucoin: await getKucoinTicker(),
         huobi: await getHuobiTicker(),
        //  okx: await getOkexTicker()
     }, 2);

    console.log(arbitrage)

     return arbitrage
}
app.get("/", async (req, res) => {
    try {
       const data = await getdata();
        res.render('index', {
            data: data
        })
    } catch (error) {
        console.log(error.message)
    }
})



app.listen(5000, () => {
    console.log(5000);
})
