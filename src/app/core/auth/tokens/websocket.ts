// websocket-token.ts
import { InjectionToken } from "@angular/core";
import { io, Socket } from "socket.io-client";

export const IoToken = new InjectionToken<(() => Socket) | null>(
  "Socket.IO factory",
  {
    providedIn: "root",
    factory: () => {
      if (typeof window !== "undefined") {
        const url =
          window.location.hostname.includes("localhost")
            ? "http://localhost:3000"
            : "https://SEU-BACK-NO-RENDER.onrender.com"; // URL do backend

        return () =>
          io(url, {
            transports: ["websocket"],
          });
      }
      return null;
    },
  }
);
