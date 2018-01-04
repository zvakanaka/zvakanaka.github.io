# Raspberry Pi
## [Camera](https://www.raspberrypi.org/documentation/raspbian/applications/camera.md)

## Local IP Address
`hostname -I`

## [Security](https://www.raspberrypi.org/documentation/configuration/security.md)

## Serial Connection
`sudo screen /dev/ttyUSB0 115200`
[reference](https://learn.adafruit.com/adafruits-raspberry-pi-lesson-5-using-a-console-cable/test-and-configure)
If the text becomes [corrupted](https://www.raspberrypi.org/forums/viewtopic.php?f=32&t=120112), make sure 5V of power is supplied.

## Web Servers
- [Nginx](https://www.raspberrypi.org/documentation/remote-access/web-server/nginx.md)
- [Lighttpd](https://pimylifeup.com/raspberry-pi-lighttpd/)
- [Apache2](https://www.raspberrypi.org/documentation/remote-access/web-server/apache.md)

## Wi-Fi
`/etc/wpa_supplicant/wpa_supplicant.conf`
### WPA2
```
network={
ssid="home"
scan_ssid=1
key_mgmt=WPA-PSK
psk="passphrase"
}```
