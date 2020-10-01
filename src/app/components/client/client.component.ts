import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public socket = io('ws://localhost:8000');
  public observer;
  
  constructor() { }

  ngOnInit() { 
    this.socket.on('clientDOM', clientDOM => {
      console.log(`client.component: ${clientDOM}`);
      document.getElementById('sync-placeholder').innerHTML = clientDOM;
      this.observer = true;
    });

    this.socket.on('scroll', scrollPos => {
      this.settingScroll(scrollPos)
    });

    this.socket.on('windowResize', windowSize => {
      this.setWindowSize(windowSize);
    });

    this.socket.on('mouseMove', mousePositions => {
      this.setMousePositions(mousePositions);
    })
  }

  public settingScroll(scrollPosition) {
    window.scrollTo(0, scrollPosition);
  }

  public setWindowSize(windowSize) {
    const body = document.getElementById('sync-wrapper');
    body.style.height = '200px';
    windowSize.type === 'width' ? body.style.width = windowSize.size+'px' : body.style.height = windowSize.size+'px';  
    console.log(`client.component.setWindowSize: ${body.style.height}`);
    
  }

  public setMousePositions (mousePositions) {
    if(document.getElementById('client_mouse')){
      const client_mouse = document.getElementById('client_mouse');
      
      client_mouse.style.position = 'absolute';
      client_mouse.style.left = mousePositions.clientX+'px';
      client_mouse.style.top = mousePositions.clientY+'px';
    } else {
      console.log(`Not connected to client`);
    }
  }
}
