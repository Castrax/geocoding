import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
};

const addMarkers = (map, markers) => {
  markers.forEach((marker) => {
    const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);
    const element = document.createElement('div');
      element.className = 'marker';
      element.style.backgroundImage = `url('${marker.image_url}')`;
      element.style.backgroundSize = 'contain';
      element.style.width = '50px';
      element.style.height = '50px';
    new mapboxgl.Marker(element)
      .setLngLat([ marker.lng, marker.lat ])
      .setPopup(popup)
      .addTo(map);
    });
}

const initMapbox = () => {
  const mapElement = document.getElementById('map');
  if (mapElement) {
    const markers = JSON.parse(mapElement.dataset.markers);
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2FzdHJhIiwiYSI6ImNrMmc4YWgzeDBtanczbG9lenM2MmM5d2EifQ.IFKl5HM6C0b8_FRdYHMpCw';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/castra/ckhn79hay0jmz19qqm0drk6h4'
    });
    addMarkers(map, markers);
    fitMapToMarkers(map, markers);
    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
                                          mapboxgl: mapboxgl }));
  }
}

export { initMapbox }
