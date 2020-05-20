#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <WiFiClient.h>
#include <HTTPSRedirect.h>

#define IRLEDPIN 14
#define WIFISSID "DosxOnHub"
#define PASSWORD "22088866"

#define HTTPS_PORT 443
#define HOST "script.google.com"
#define URL "/macros/s/AKfycbyBMBIFrLi3u8T96giB1LwuKuH8GJMmhacyD4uf/exec"

HTTPSRedirect* client = nullptr;

void setup()
{
  Serial.begin(115200);

  ConnectWifi();
  pinMode(IRLEDPIN, OUTPUT);
  pinMode(13, OUTPUT);
  pinMode(5, INPUT);
}

void loop()
{
  delay(1000);
  String Command = doRedirectGet();
  Serial.println(Command);
  if(Command != "")
    analyseAndSend(Command);
}

/**
 *  Function to receive the raw data and send it through IR.
 *  
 *  @param Data  String with raw data and size
 *  
 *  @retval      None
 */
void analyseAndSend(String Data)
{
  String       tempData = Data;
  int          i;
  int          dataSize = tempData.substring(tempData.indexOf("&")+1, tempData.indexOf("=")).toInt();
  uint16_t    *IrData;

  if(dataSize == 0)
    return;

  IrData = (uint16_t*)malloc(dataSize*sizeof(uint16_t));

  tempData = tempData.substring(tempData.indexOf("=") + 1);
  for(i=0; i<dataSize; i++)
  {
    if(tempData.indexOf(",") != -1)
    {
      IrData[i] = tempData.substring(0, tempData.indexOf(",")).toInt();
      tempData = tempData.substring(tempData.indexOf(",") + 1);
      // Serial.println(IrData[i]);
    }
    else
    {
      IrData[i] = tempData.toInt();
      // Serial.println(IrData[i]);
      break;
    }
  }
  sendIRData(IrData, i+1);
}

/**
 *  Function to connect to the home wifi
 *  
 *  @param  None
 *  
 *  @retval None
 */
void ConnectWifi()
{
  WiFi.begin(WIFISSID, PASSWORD);
  while ( WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(WIFISSID);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

/**
 *  Function to do a redirect Get
 *  
 *  @param None
 *  
 *  @param String got from HTTP Get 
 */
String doRedirectGet()
{
  HTTPSRedirect* client = nullptr;
  String body = "";
  client = new HTTPSRedirect(HTTPS_PORT);
  if (!client->connect(HOST, HTTPS_PORT)) {
    Serial.println("connection failed");
    return body;
  }

  client->GET(URL, HOST);
  body = client->getResponseBody();
  delete client;
  client = nullptr;
  return body;
}

/**
 *  Function to send the IR data
 *  
 *  @param  *data     raw data to send to the device
 *  
 *  @param  dataSize  siza of the data
 */
void sendIRData(unsigned int  *data, int dataSize)
{
  int i = 0, power = HIGH;

  digitalWrite(IRLEDPIN, LOW);

  while (i < dataSize)
  {
    if (power == HIGH)
    {
      long startedTime = micros();
      while (micros() - startedTime < data[i])
      {
        digitalWrite(IRLEDPIN, HIGH);
        delayMicroseconds(8);
        digitalWrite(IRLEDPIN, LOW);
        delayMicroseconds(13);
      }

      power = LOW;
    } else {
      digitalWrite(IRLEDPIN, LOW);
      delayMicroseconds(data[i]);
      power = HIGH;
    }
    i++;
  }

  digitalWrite(IRLEDPIN, LOW);
}
