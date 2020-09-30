import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public socket = io('ws://localhost:8000');
  
  constructor() { }

  ngOnInit() {
     
    this.socket.on('clientDOM', clientDOM => {
      console.log(`client.component: ${clientDOM}`);
      document.getElementsByTagName('HTML')[0].innerHTML = clientDOM;
    });

    this.socket.on('scroll', scrollPos => {
      this.settingScroll(scrollPos)
    });

    this.socket.on('windowResize', windowSize => {
      this.setWindowSize(windowSize);
    });
  }

  public settingScroll(scrollPosition) {
    window.scrollTo(0, scrollPosition);
  }

  public setWindowSize(width) {
    window.resizeTo(parseInt(width), 100);
    console.log(`client.component.setWindowSize: ${width}`);
    
  }
}
