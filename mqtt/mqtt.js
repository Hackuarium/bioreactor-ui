console.log('START')

const client = mqtt.connect('wss://mqtt.hackuarium.org');

client.subscribe("#")

client.on("message", function (topic, payload) {
  console.log({topic, payload})
})

;

console.log(client)
