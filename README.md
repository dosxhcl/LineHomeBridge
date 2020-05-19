# LineHomeBridge
Project to use LINE as remote for the consumer electronics @ Home

This is a Smart Home project.

Nower days, smart speakers can do more and more. Although the new consumer electronics supports smart speakers, the ones from the old days does not. This project is to make the things we have now smarter with cost efficiency.

Most of our consumer electronics supports IR as if remote controller comes with it.
This project will use IR as the base to control the machines. (What I have are 3 ceiling lights, a TV, a Air Conditioner)
A common remote is needed, the following link is the IoT circuit board used this time:
https://www.switch-science.com/catalog/2740/

This little board contains:
- ESP-WROOM-02 Wifi Module
- 4 LED transmitter (GPIO14)
- 1 IR Receiver (GPIO5)

The concept is to type a text in LINE and wrap this text with WebHook and the WebHook to notify this IR Remote board to send a signal.
