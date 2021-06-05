#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP280.h>
#include <LiquidCrystal_I2C.h>

#include <DHT.h>
#include <DHT_U.h>
#define DHTTYPE    DHT11     // DHT 11
DHT_Unified dht(2, DHTTYPE);
// Set the LCD address to 0x27 or 0x3f for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x27, 20, 4);

#define BMP_SCK 13
#define BMP_MISO 12
#define BMP_MOSI 11 
#define BMP_CS 10

Adafruit_BMP280 bme; // I2C  if this is definded we use i2c communication
//Adafruit_BMP280 bme(BMP_CS); // hardware SPI
//Adafruit_BMP280 bme(BMP_CS, BMP_MOSI, BMP_MISO,  BMP_SCK);
  
void setup() {
  dht.begin();
  lcd.init();
  lcd.backlight();
  Serial.begin(9600);  
  if (!bme.begin()) {  
    Serial.println("Could not find a valid BMP280 sensor, check wiring!");
    while (1);
  }
}
  
void loop() {

    sensors_event_t event;
    dht.humidity().getEvent(&event);
  int temp = bme.readTemperature();
  int pressure = bme.readPressure();
  int humidty = event.relative_humidity;
  int wind = 0;
  int moist = 0;

  // "{\"temperature\":0,\"pressure\":0,\"wind\":0,\"moist\":0,\"humidity\":0}"
  String payload = "{";
  payload += "\"temperature\":";
  payload += temp;
  payload += ",";
  payload += "\"pressure\":";
  payload += pressure;
  payload += ",";
  payload += "\"humidity\":";
  payload += humidty;
  payload += ",";
  payload += "\"wind\":";
  payload += wind;
  payload += ",";
  payload += "\"moist\":";
  payload += moist;
  payload += "}";

  Serial.println(payload);
    delay(5000);
}