#include <DHT.h>                  // Data ---> D3 VCC ---> 3V3 GND ---> GND
#include <WiFi.h>
#include <SPI.h>

#include <OneWire.h>
#include <HX711_ADC.h>
#include <DallasTemperature.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
// WiFi parameters
#define WLAN_SSID       "ijk"
#define WLAN_PASS       ""
// Adafruit IO
#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "aadhayma"
#define AIO_KEY         "aio_AVGR879flTtnFvIU1ZZmmMmVdXmY" 
WiFiClient client;
// Setup the MQTT client class by passing in the WiFi client and MQTT server and login details.
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);
Adafruit_MQTT_Publish Temperature = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/Temperature");
Adafruit_MQTT_Publish poid = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/poid");
Adafruit_MQTT_Publish Temperature1 = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/Temperature1");
Adafruit_MQTT_Publish Humidity = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/Humidity");

#define ONE_WIRE_BUS 26

OneWire oneWire(ONE_WIRE_BUS);
#define DHT11_PIN 18
#define DHTTYPE DHT11
DallasTemperature sensors(&oneWire);
DHT dht(DHT11_PIN, DHTTYPE);

const int HX711_dout = 22; //mcu > HX711 dout pin
const int HX711_sck = 19; //mcu > HX711 sck pin
byte hum = 0;  //Stores humidity value
byte temp = 0; //Stores temperature value
const int calVal_eepromAdress = 0;
unsigned long t = 0;

HX711_ADC LoadCell(HX711_dout, HX711_sck);
void setup() {
  Serial.begin(115200);
  dht.begin();
  sensors.begin();
  Serial.println(F("Adafruit IO Example"));
  // Connect to WiFi access point.
  Serial.println(); Serial.println();
  delay(10);
  Serial.print(F("Connecting to "));
  Serial.println(WLAN_SSID);
  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(F("."));
  }
  Serial.println();
  Serial.println(F("WiFi connected"));
  Serial.println(F("IP address: "));
  Serial.println(WiFi.localIP());

  // connect to adafruit io
  connect();
  LoadCell.begin();
  //LoadCell.setReverseOutput(); //uncomment to turn a negative output value to positive
  float calibrationValue; // calibration value (see example file "Calibration.ino")
  calibrationValue = 696.0; // uncomment this if you want to set the calibration value in the sketch
#if defined(ESP8266)|| defined(ESP32)
  //EEPROM.begin(512); // uncomment this if you use ESP8266/ESP32 and want to fetch the calibration value from eeprom
#endif
  //EEPROM.get(calVal_eepromAdress, calibrationValue); // uncomment this if you want to fetch the calibration value from eeprom

  unsigned long stabilizingtime = 2000; // preciscion right after power-up can be improved by adding a few seconds of stabilizing time
  boolean _tare = true; //set this to false if you don't want tare to be performed in the next step
  LoadCell.start(stabilizingtime, _tare);
  if (LoadCell.getTareTimeoutFlag()) {
    Serial.println("Timeout, check MCU>HX711 wiring and pin designations");
    while (1);
  }
  else {
    LoadCell.setCalFactor(calibrationValue); // set calibration value (float)
    Serial.println("Startup is complete");
  }
}



// connect to adafruit io via MQTT
void connect() {
   
  Serial.print(F("Connecting to Adafruit IO... "));
  int8_t ret;
  while ((ret = mqtt.connect()) != 0) {
    switch (ret) {
      case 1: Serial.println(F("Wrong protocol")); break;
      case 2: Serial.println(F("ID rejected")); break;
      case 3: Serial.println(F("Server unavail")); break;
      case 4: Serial.println(F("Bad user/pass")); break;
      case 5: Serial.println(F("Not authed")); break;
      case 6: Serial.println(F("Failed to subscribe")); break;
      default: Serial.println(F("Connection failed")); break;
    }

    if(ret >= 0)
      mqtt.disconnect();

    Serial.println(F("Retrying connection..."));
    delay(10000);
  }
  Serial.println(F("Adafruit IO Connected!"));
}

void loop() {
  static boolean newDataReady = 0;
  const int serialPrintInterval = 100;
  sensors.requestTemperatures();
  // ping adafruit io a few times to make sure we remain connected
  if(! mqtt.ping(3)) {
    // reconnect to adafruit io
    if(! mqtt.connected())
      connect();
  }
  temp = dht.readTemperature();
  hum = dht.readHumidity();
  if (LoadCell.update()) newDataReady = true;

  // get smoothed value from the dataset:
  if (newDataReady) {  
      
    if (millis() > t + serialPrintInterval) {
      float i = LoadCell.getData();
      Serial.print("Load_cell output val: ");
      Serial.println(i);
      newDataReady = 0;
      t = millis();
  Serial.print((int)temp); Serial.print(" *C, "); 
  Serial.print((int)hum); Serial.println(" H");
  Serial.print("Celsius temperature: ");
  // Why "byIndex"? You can have more than one IC on the same bus. 0 refers to the first IC on the wire
  Serial.print(sensors.getTempCByIndex(0)); 
  delay(50000);
   
  
    }
  
  }
  float i = LoadCell.getData();
   if (! Temperature.publish(temp)) {                     //Publish to Adafruit
      Serial.println(F("Failed"));
    } 
     if (! Temperature1.publish(sensors.getTempCByIndex(0))) {                     //Publish to Adafruit
      Serial.println(F("Failed"));
    } 
       if (! Humidity.publish(hum)) {                     //Publish to Adafruit
      Serial.println(F("Failed"));
    }
      if (! poid.publish(i)) {                     //Publish to Adafruit
      Serial.println(F("Failed"));
    }
    else {
      Serial.println(F("Sent!"));
    }
    delay(1000);
}