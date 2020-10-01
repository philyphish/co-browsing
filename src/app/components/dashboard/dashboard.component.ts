import { Component, OnInit, HostListener } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import io from 'socket.io-client';
import { Observable, of, Subject, from } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  public connectionState: string;
  public wss;
  public socket = io('ws://localhost:8000');
  public clientList = [];
  public clients;
  public windowHeight;
  public windowWidth;

  @HostListener('window:scroll', ['$event'])
  sendScroll(event) {
  console.log('scrolling', window.scrollY);
  this.socket.emit('scroll', window.scrollY);
}

@HostListener('window:resize', ['$event'])
sendWindowSize(event) {
  if (window.innerHeight !== this.windowHeight) {
    this.socket.emit('windowResize', {'type': 'height','size':window.innerHeight});
    this.windowHeight = window.innerHeight;
  } else { 
    this.socket.emit('windowResize', {'type': 'width', 'size': window.innerWidth});
    this.windowWidth = window.innerWidth;
  }  
}

@HostListener('window:mousemove', ['$event'])
sendmouseMove(event) {
  this.socket.emit('mouseMove', {'clientX': event.clientX, 'clientY': event.clientY});
  
}
  constructor() {
   }

  ngOnInit() {
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
    const client_dom = document.getElementsByTagName('HTML')[0].innerHTML;

      this.socket.on('emitClients', clients => {
        this.clientList.push(clients);
        this.clients = from(this.clientList);
      });

      this.sendClientDOM(client_dom);
  }

  public sendClientDOM(client_dom) {
    this.socket.emit('sendDOM', client_dom);
  };

  public submitMsg() {
    this.socket.emit('request', 'This is a message');
  }

}
