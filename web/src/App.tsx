import Map, { GeolocateControl, NavigationControl, Source, Layer } from 'react-map-gl';

const geojson = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', geometry: { type: 'Point', coordinates: [143.8503, -37.5622] } }
  ]
};

const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};

function App() {
  return (
    <div>
      <main>
        <Map
          initialViewState={{
            longitude: 143.8503,
            latitude: -37.5622,
            zoom: 9
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        >
          <GeolocateControl />
          <NavigationControl />
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
        </Map>
      </main>
    </div>
  )
}

export default App
