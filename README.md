The first goal is to be able to display the result of the monitoring of the computer. We have a MQTT
broker that is receiving information about my server every 10s. We should create everything required to display chart
for the monitoring.

After installing `mosquitto` you can check the packets using `mosquitto_sub -h mqtt.beemos.org -t "lpatiny/Computer/server"`

## Use Zakodium components

Please have a look at: https://github.com/Hackuarium/bioreactor-ui/issues/9 and try to migrate to it if possible.

## Create preferences and menu

The menu on the left will depend on the available devices. So at the beginning we have only the preferences menu.

The preference menu contains 4 submenu. The next step to implement is the preferences: https://github.com/Hackuarium/bioreactor-ui/issues/7

Once we know the devices that are configured we can display in the menu the corresponding categories if there is at least one device configured.

Bioreactor (if there are some devices of category OpenBio6)

Beemos (if there are some devices of category Beemos)

Computer (if there are some devices of category Computer)

Spectrophotometer (if there are some devices of category SimpleSpectro)

As a submenu of those 4 categories we will display the custom name defined by the user in the preferences

## Store / Synchronise data

First step:

There should be a background process that will take care to listen for all the MQTT packets received for the Broadcast devices.

The packet is parsed and store in a local pouchDB. I would use for the pouchDB database name the device kind + underscore + custom name. This will allow in the future to display the results for the currently configured devices as well as some
historetical data for which there is a pouchDB database.

We will see laster how to synchronize interactive devices.

## Display the results

Based on the preferences we fill the menu on the left. In this case there should be a menu `Computer` with a submenu `Luc_Cellar` (if this is the name used in the preferences).

Clicking on this submenu will bring the `Computer` layout to display the results.

In the layout there will be 4 charts:

- Load
  - xAxis: time
  - yAxis: % from 0 to 100 (forced values)
  - series: total, user, system
- I/O
  - xAxis: time
  - yAxis: kb / s (not sure about this per second, the format is wrong seems to me)
  - series: Network read, Network write, Disk read, Disk write
- FS
  - xAxis: time
  - yAxis: % from 0 to 100 (forced values)
  - series: min, max
- Temperature
  - xAxis: time
  - yAxis: °C from 0 to 100 (forced values)
  - series: CPU

On the top we should be able to define if we want to display:
1h / 1d / 1m / 1y

We will see later if we need more flexibility for the date picking.
