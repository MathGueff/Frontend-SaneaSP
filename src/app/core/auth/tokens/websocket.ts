// websocket-token.ts
import { InjectionToken } from "@angular/core";
import { io, Socket } from "socket.io-client";

export const IoToken = new InjectionToken<(() => Socket) | null>(
  "Socket.IO factory",
  {
    providedIn: "root",
    factory: () => {
      if (typeof window !== "undefined") {
        return () => io();         
      }
      return null;
    }
  }
);
