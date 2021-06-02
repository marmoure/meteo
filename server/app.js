const path = require("path")
const fs = require("fs").promises;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const SerialPort = require('serialport');

const measures = {
    temperature: 00,
    pressure: 00,
    wind: 00,
    moist: 00,
    humidity: 00,
}

const measuresHistory = [];

const app = express();
app.use(express.static(path.join(__dirname,"UI")));
app.use(cors());

app.get("/measures",(req,res) => {
    res.json(measures);
})

app.get("/history",(req,res) => {
    res.json(measuresHistory);
})

app.use((req, res) => {
    res.sendFile(path.join(__dirname,"UI","index.html"))
});

app.listen(3000);

// serial connection
const port = new SerialPort("COM26");
const Readline = SerialPort.parsers.Readline
const parser = port.pipe(new Readline())
parser.on('data', (data => {
    try {
        const {temperature, pressure, wind ,moist,humidity} = JSON.parse(data);
        measures.temperature = temperature;
        measures.humidity = humidity;
        measures.pressure = pressure;
        measures.moist = moist;
        measures.wind = wind;
        
        measuresHistory.push({temperature, pressure, wind ,moist,humidity,time: Date.now()});
        if(measuresHistory.length > 10) measuresHistory.shift();

        fs.writeFile("data.json",JSON.stringify(measuresHistory));
    } catch (error) {
        
    }
}))


