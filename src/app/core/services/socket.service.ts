import { Inject, Injectable } from '@angular/core';

import { Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { IoToken } from '@core/auth/tokens/websocket';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket | null = null;

  constructor(
    @Inject(IoToken) private ioFactory: (() => Socket) | null
  ) {
    if (this.ioFactory) {
      this.socket = this.ioFactory();
    } else {
      console.warn("SSR: Socket.IO não está disponível");
    }
  }

  emit<T>(event: string, data: T) {
    console.log('event', event, 'data', data)
    if (!this.socket) return;
    this.socket.emit(event, data);
  }

  on<T>(event: string): Observable<T> {
    return new Observable<T>((observer) => {
      if (!this.socket) return;
      this.socket.on(event, (data) => observer.next(data));
    });
  }
}
