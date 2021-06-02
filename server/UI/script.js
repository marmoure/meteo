const stub = `[{"temperature":30,"pressure":25662,"wind":0,"moist":0,"humidity":60,"time":1622642708441},{"temperature":30,"pressure":25660,"wind":0,"moist":0,"humidity":55,"time":1622642713479},{"temperature":30,"pressure":25656,"wind":0,"moist":0,"humidity":52,"time":1622642718522},{"temperature":30,"pressure":25657,"wind":0,"moist":0,"humidity":50,"time":1622642723559},{"temperature":30,"pressure":25660,"wind":0,"moist":0,"humidity":49,"time":1622642728598},{"temperature":30,"pressure":25659,"wind":0,"moist":0,"humidity":48,"time":1622642733640},{"temperature":29,"pressure":25660,"wind":0,"moist":0,"humidity":47,"time":1622642738679},{"temperature":32,"pressure":25647,"wind":0,"moist":0,"humidity":47,"time":1622642743722},{"temperature":32,"pressure":25657,"wind":0,"moist":0,"humidity":46,"time":1622642748760},{"temperature":32,"pressure":25659,"wind":0,"moist":0,"humidity":46,"time":1622642753798}]`;
const DataHistory = JSON.parse(stub);

const measures = {
    temperature: 00,
    pressure: 00,
    wind: 00,
    moist: 00,
    humidity: 00,
}

// setInterval(() => {
//     fetch("/measures")
//         .then(data => data.json())
//         .then(({temperature, pressure, wind ,moist,humidity}) => {
//             measures.temperature = temperature;
//             measures.humidity = humidity;
//             measures.pressure = pressure;
//             measures.moist = moist;
//             measures.wind = wind; 
//             render();
//         })
//         .catch(console.log)
// }, 5000)

const Temperature = document.getElementById("Temperature");
const Pressure = document.getElementById("Pressure");
const Humidity = document.getElementById("Humidity");
const Wind = document.getElementById("Wind");
const Moister = document.getElementById("Moister");


function render() {
    Temperature.innerText = measures.temperature;
    Pressure.innerText = measures.pressure;
    Humidity.innerText = measures.humidity;
    Wind.innerText = measures.wind;
    Moister.innerText = measures.moist;
}

function options(label,color) {
    return {
        type: 'line',
        data: {
            datasets: [{
                label: label,
                backgroundColor: color,
                borderColor: color,
                data: [],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio:false,
            scales: {
                x:{
                    type: 'time',
                    time: {
                        unit:"second",
                        displayFormats: {
                            second: 'hh:mm:ss'
                        }
                    }
                },
                // y: {
                //     beginAtZero: true
                // }
            }
        }
    }
}


const tempChart = new Chart(document.getElementById('temp-chart').getContext('2d'), options("temperature",'rgb(255, 99, 132)'));
const humidChart = new Chart(document.getElementById('humid-chart').getContext('2d'), options("Humidity",'rgba(54, 162, 235, 1)'));
const windChart = new Chart(document.getElementById('wind-chart').getContext('2d'), options("Wind",'rgba(255, 206, 86, 1)'));
const moistChart = new Chart(document.getElementById('moist-chart').getContext('2d'), options("moist",'rgba(75, 192, 192, 1)'));
const pressureChart = new Chart(document.getElementById('pressure-chart').getContext('2d'), options("pressure",'rgba(153, 102, 255, 1)'));


// setInterval(() => {
//     fetch("/history")
//         .then(data => data.json())
//         .then((history) => {
//             // {temperature, pressure, wind ,moist,humidity}
//             tempChart.data.datasets[0].data = history.map(h => {
//                 return {y: h.temperature,x:h.time}
//             })

//             humidChart.data.datasets[0].data = history.map(h => {
//                 return {y: h.humidity,x:h.time}
//             })

//             windChart.data.datasets[0].data = history.map(h => {
//                 return {y: h.wind,x:h.time}
//             })
            
//             moistChart.data.datasets[0].data = history.map(h => {
//                 return {y: h.moist,x:h.time}
//             })
            
//             pressureChart.data.datasets[0].data = history.map(h => {
//                 return {y: h.pressure,x:h.time}
//             })

//             humidChart.update();
//             tempChart.update();
//             moistChart.update();
//             pressureChart.update();
//             windChart.update();
//         })
//         .catch(console.log)
// }, 5000);




let idx = 0;
setInterval(() => {

    const history = DataHistory.slice(0,idx);
    idx++;

    tempChart.data.datasets[0].data = history.map(h => {
        return {y: h.temperature,x:h.time}
    })

    humidChart.data.datasets[0].data = history.map(h => {
        return {y: h.humidity,x:h.time}
    })

    windChart.data.datasets[0].data = history.map(h => {
        return {y: h.wind,x:h.time}
    })
    
    moistChart.data.datasets[0].data = history.map(h => {
        return {y: h.moist,x:h.time}
    })
    
    pressureChart.data.datasets[0].data = history.map(h => {
        return {y: h.pressure,x:h.time}
    })

    humidChart.update();
    tempChart.update();
    moistChart.update();
    pressureChart.update();
    windChart.update();

    
    const {temperature, pressure, wind ,moist,humidity} = DataHistory[idx] || {
        temperature: 00,
        pressure: 00,
        wind: 00,
        moist: 00,
        humidity: 00,
    };
    render();

},5000);