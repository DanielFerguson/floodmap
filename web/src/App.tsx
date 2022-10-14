import { ReactNode } from 'react';
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

type Props = {
  children?: ReactNode;
};

const Button = ({ children }: Props) => {
  return (
    <button
      type="button"
      disabled
      className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {children}
    </button>
  )
}

function App() {
  return (
    <div>
      <main className='relative'>
        {/* Desktop Toolbar */}
        <nav className='hidden sm:flex absolute z-20 top-0 left-0 bg-white m-6 px-6 py-4 rounded-lg shadow flex gap-12'>
          {/* Branding */}
          <div className='flex items-center gap-3'>
            <img src="/favicon.svg" alt="Flood map icon" className='h-6 w-auto' />
            <h1 className='font-permanent'>Flood Map</h1>
          </div>

          {/* Actions */}
          <div className='flex gap-3'>
            {/* Add Road */}
            <Button>
              <PencilIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Add Road
            </Button>
            {/* Login/Logout */}
            <Button>
              <UserCircleIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Login
            </Button>
          </div>
        </nav>

        {/* Mobile Toolbar */}
        <nav className='sm:hidden z-20 flex justify-between absolute bottom-0 right-0 left-0 mx-6 mb-10 rounded px-6 py-4 bg-white shadow-lg'>
          {/* Branding */}
          <div className='flex items-center gap-3'>
            <img src="/favicon.svg" alt="Flood map icon" className='h-6 w-auto' />
            <h1 className='font-permanent'>Flood Map</h1>
          </div>

          {/* Actions */}
          <div className='flex gap-3'>
            <Button>
              <PencilIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Add Road
            </Button>
            <Button>
              <UserCircleIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Login
            </Button>
          </div>
        </nav>

        {/* Map */}
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
