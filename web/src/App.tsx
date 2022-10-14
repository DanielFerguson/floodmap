import Map, { GeolocateControl, NavigationControl, Source, Layer } from 'react-map-gl';
import { PencilIcon, UserCircleIcon } from '@heroicons/react/24/outline'

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
      <main className='relative'>
        {/* Toolbar */}
        <nav className='absolute z-20 top-0 left-0 bg-white m-6 px-6 py-4 rounded-lg shadow flex gap-12'>
          {/* Branding */}
          <div className='flex items-center gap-3'>
            <img src="/favicon.svg" alt="Flood map icon" className='h-6 w-auto' />
            <h1 className='font-permanent'>Flood Map</h1>
          </div>

          {/* Actions */}
          <div className='flex gap-3'>
            {/* Add Road */}
            <button
              type="button"
              disabled
              className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PencilIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Add Road
            </button>
            {/* Login/Logout */}
            <button
              type="button"
              className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <UserCircleIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Login
            </button>
          </div>
        </nav>

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
