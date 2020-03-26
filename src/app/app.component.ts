import { Component } from '@angular/core';
import * as mqttt from "mqtt";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  constructor() {
    var client = mqttt.connect('mqtt://test.mosquitto.org')

    client.on('connect', function () {
      client.subscribe('presence', function (err) {
        if (!err) {
          client.publish('presence', 'Hello mqtt')
        }
      })
    })

    client.on('message', function (topic, message) {
      // message is Buffer
      console.log(message.toString())
      client.end()
    })
  }
}
