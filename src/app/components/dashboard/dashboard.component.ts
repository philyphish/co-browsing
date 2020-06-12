import { Component, OnInit, HostListener } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import io from 'socket.io-client';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  public connectionState: string;
  public wss;
  public socket = io('ws://localhost:3000');

  @HostListener('window:scroll', ['$event'])
  sendScroll(event) {
  console.log('scrolling', window.scrollY);
  this.socket.emit('scroll', window.scrollY);
}
  constructor() { }

  ngOnInit() {
    io().on('emitClients', clients => {
      console.log(clients);
    });
    //io('ws://localhost:3000'); // connect to websocket
  }
  
  public submitMsg() {
    this.socket.emit('request', 'This is a message');
  }

}
