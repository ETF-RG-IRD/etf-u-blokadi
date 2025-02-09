import { Component, AfterViewInit, NgZone, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';

// Fix for default marker icon issues in many build setups:
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

@Component({
  selector: 'app-donations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements AfterViewInit, OnDestroy {
  private map!: L.Map;

  private readonly BELGRADE_CENTER: L.LatLngExpression = [44.7866, 20.4489];
  private readonly BELGRADE_BOUNDS = L.latLngBounds(
    L.latLng(44.70, 20.30),
    L.latLng(44.90, 20.60)
  );

  private readonly LOCATIONS = new Map<string, [number, number]>([
    ["Arhitektonski Fakultet", [20.476271197910265, 44.805254076225896]],
    ["Gradjevinski Fakultet", [20.4770000000000, 44.805254076225896]],
    ["Fakultet Bezbednosti", [20.47895220572107, 44.791339901640825]],
    ["Ekonomski Fakultet", [20.454924904335936, 44.81186202198768]],
    ["Elektrotehnički Fakultet", [20.476234674090246, 44.80580041357579]],
    ["Farmaceutski Fakultet", [20.49493490008412, 44.74748077309478]],
    ["Filološki, Biološki i Geografski fakultet", [20.45721637484622, 44.8188929708989]],
    ["Filozofski Fakultet", [20.45701670463771, 44.8190864839996]],
    ["Fizički Fakultet", [20.459471630152517, 44.819145810685384]],
    ["Hemijski Fakultet", [20.45932693515424, 44.81963198896325]],
    ["MATF", [20.458708804167117, 44.819930990382986]],
    ["Mašinski Fakultet", [20.47732218387936, 44.80685725995381]],
    ["Fakultet Političkih Nauka", [20.475324870976515, 44.773747707215584]],
    ["Poljoprivredni Fakultet", [20.412373779366455, 44.840525329097815]],
    ["Pravni Fakultet", [20.47276478131266, 44.80733758557524]],
    ["Rektorat UB", [20.45758667942569, 44.81846092246269]],
    ["FASPER", [20.456003311387224, 44.82641993069861]],
    ["Stomatološki Fakultet", [20.467013396375556, 44.79610329835709]],
    ["TMF", [20.476279101570963, 44.807421932156196]],
    ["Veterinarska Medicina", [20.46558157946399, 44.794323616534044]],
    ["Fakultet muzičke umetnosti", [20.464306142446432, 44.805580394523595]],
    ["Fakultet likovnih umetnosti", [20.453532860655102, 44.819542839364395]],
    ["Fakultet primenjenih umetnosti", [20.45173448773321, 44.81701448367373]],
    ["Akademija struk. stud. Politehnika", [20.490598539656695, 44.80384616383724]],
    ["Visoka ICT škola", [20.48437188263611, 44.81426859304584]],
    ["BAPUSS - Umetnički", [20.49457738392238, 44.80728000014744]],
    ["BAPUSS - Poslovni", [20.481041268854053, 44.804199656582895]],
    ["Visoka zdravstvena škola", [20.380804982159084, 44.85844162429406]],
    ["VIŠER", [20.47995649612723, 44.76832552221673]],
    ["Univerzitet Metropolitan", [20.455155840507967, 44.83055028434515]]
  ]);

  private customIcon = L.icon({
    iconUrl: './map-pin.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initMap();
      this.addMarkers();
      
      setTimeout(() => {
        this.map.invalidateSize();
        this.map.setView(this.BELGRADE_CENTER, 13);
      }, 100);

      window.addEventListener('resize', this.debouncedResize);
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.BELGRADE_CENTER,
      zoom: 11,
      preferCanvas: true,
      maxBounds: this.BELGRADE_BOUNDS,
      maxBoundsViscosity: 1.0
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      minZoom: 12,
      maxZoom: 20,
      crossOrigin: true,
      updateWhenIdle: false,
      updateInterval: 100
    }).addTo(this.map);
  }

  private debouncedResize = this.debounce(() => {
    this.map.invalidateSize();
  }, 100);

  private debounce(fn: Function, delay: number) {
    let timeout: any;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(fn, delay);
    };
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.debouncedResize);
  }

  private addMarkers(): void {
    Array.from(this.LOCATIONS.entries()).forEach(([name, coordinates]) => {
      const marker = L.marker([coordinates[1], coordinates[0]], { icon: this.customIcon })
        .addTo(this.map)
        .bindPopup(name, { autoClose: false, closeOnClick: false });
      
      marker.on('mouseover', () => {
        marker.getPopup()?.getElement()?.classList.add('fade-in');
        marker.openPopup();
      });
      
      marker.on('mouseout', () => {
        marker.getPopup()?.getElement()?.classList.remove('fade-in');
        setTimeout(() => marker.closePopup(), 100);
      });
    });
  }
}
