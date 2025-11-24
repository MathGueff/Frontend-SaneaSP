import { isPlatformBrowser } from "@angular/common";
import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  PLATFORM_ID,
} from "@angular/core";
import { Map } from "leaflet";

@Component({
  selector: "app-map",
  template: `<div [id]="mapId" class="leaflet-map"></div>`,
  styleUrls: ["./map.component.css"],
  host: { ngSkipHydration: "true" },
})
export class MapComponent implements AfterViewInit {
  @Input() lat: number = 23.55052;
  @Input() lon: number = -46.633308;
  @Input() mapId: string = "map";

  private isBrowser: boolean;
  private L: any;
  private map!: Map;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngAfterViewInit() {
    if (!this.isBrowser) return;

    this.L = await import("leaflet");

    const container = document.getElementById(this.mapId);
    if (container && (container as any)._leaflet_id) {
      (container as any)._leaflet_id = null;
    }

    this.initMap();
  }

  private initMap() {
    const L = this.L;

    const DefaultIcon = L.icon({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    this.map = L.map(this.mapId).setView([-22.2963, -48.5587], 5.5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this.map);
  }

  public setMap(lat: number, lon: number, zoom: number = 13) {
    if (this.map) {
      this.map.setView([lat, lon], zoom);
    }
  }

  public addMarker(lat: number, lon: number) {
    if (this.map) {
      this.L.marker([lat, lon]).addTo(this.map);
    }
  }

  public removeLayers(){
    this.map.eachLayer(layer => {
      if ((layer as any).options?.icon) this.map.removeLayer(layer);
    });
  }
}
