import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class EnviromentService{
    private url = ""
    constructor(){
        if (typeof window !== "undefined") {
            this.url = window.location.hostname.includes("localhost")
                ? "http://localhost:3000/"
                : "https://back-saneasp.onrender.com/"; // URL do backend
      }
    }
    getUrl(){
        return this.url;
    }
}