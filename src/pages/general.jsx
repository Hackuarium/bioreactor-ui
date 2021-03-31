//import mqtt from 'mqtt';

const General = () => {
  /*
  var client = mqtt.connect('wss://mqtt.beemos.org:9001');

  client.on('connect', function () {
    client.subscribe('presence', function (err) {
      if (!err) {
        client.publish('presence', 'Hello mqtt');
      }
    });
  });

  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    console.log(topic.toString + ' : ' + message.toString());
    client.end();
  });
  */

  return <div>General</div>;
};

export default General;
