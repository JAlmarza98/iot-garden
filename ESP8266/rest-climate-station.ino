////////////////////////////////////////////////////////////////////////////////
// File:    rest_air_quality_sensor.ino                                       //
//                                                                            //
// Author:   Joel Almarza Angulo (j.almarza98@gmail.com)                      //
// Date:     Nov. 2022                                                        //
//                                                                            //
// Summary of File:                                                           //
//                                                                            //
// This file contains the code that allows obtaining environmental data       //
// through the "MQ135" and "DHT22" sensors and sends them via REST through    //
// the internet using the "ESP8266" microcontroller                           //
////////////////////////////////////////////////////////////////////////////////

// Lib
#include "ESP8266WiFi.h"
#include <aREST.h>
#include <DHT.h>
#include <DHT_U.h>
#include <Adafruit_Sensor.h>

// Def
#define DHTPIN D5
#define DHTTYPE DHT22
#define MQ A0

// Init
DHT dht(DHTPIN, DHTTYPE);

// aREST
aREST rest = aREST();

// WiFi
const char *ssid = "Xiaomi-24-YgCq";
const char *password = "HSbp6hY5Gt";

// Port
#define LISTEN_PORT 80

// Create server instance
WiFiServer server(LISTEN_PORT);

// Set static IP address
IPAddress local_IP(192, 168, 1, 184);
// Set gateway IP address
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 0, 0);

// API Variables
float mq, humidity, temperature;

void setup()
{
  Serial.begin(9600);
  dht.begin();

  // Init Variables API
  rest.variable("temperature", &temperature);
  rest.variable("humidity", &humidity);
  rest.variable("pollution", &mq);

  // Name ID
  rest.set_id("1");
  rest.set_name("nodemcu_climate_station");

  // Configures static IP address
  if (!WiFi.config(local_IP, gateway, subnet))
  {
    Serial.println("STA Failed to configure");
  }

  // Connect WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected!");

  // Start Server
  server.begin();
  Serial.println("Server started!");

  // IP
  Serial.println(WiFi.localIP());
}

void loop()
{
  // Wait 1s
  delay(1000);
  mq = analogRead(MQ);
  humidity = dht.readHumidity();
  temperature = dht.readTemperature();

  // REST Calls
  WiFiClient client = server.available();
  if (!client)
  {
    return;
  }
  while (!client.available())
  {
    delay(1);
  }
  rest.handle(client);
}
