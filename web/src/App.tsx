import { useState, ChangeEvent, FormEvent } from 'react';
import Map, { GeolocateControl, NavigationControl, Source, Layer, Marker, ViewStateChangeEvent, MapboxEvent } from 'react-map-gl';
import { PencilIcon, PlusIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import useSWR from 'swr'
import toast, { Toaster } from 'react-hot-toast';
import type { GeoJSON } from 'geojson';
import mapboxgl from 'mapbox-gl';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime);

interface HazardApiResponse {
  geojson: {
    features: GeoJSON[],
    type: "FeatureCollection"
  }
}

const hazardOptions = [
  "Flooded Road",
  "Tree Down",
  "Other",
];

const layerStyle = {
  id: 'point',
  type: 'symbol',
  source: 'pin',
  layout: {
    'icon-image': 'flood-pin',
    'icon-size': 0.75
  },
};

const fetcher = (url: string) => fetch(`http://localhost:3000${url}`).then(res => res.json());

const SaveHazard = (lat: number, lng: number, hazardType: string): Promise<Response> => {
  return fetch('http://localhost:3000/api/hazards', {
    method: 'POST',
    body: JSON.stringify({ lat, lng, hazardType })
  })
}

function App() {
  const [drawPoint, setDrawPoint] = useState<boolean>(false);
  const [lng, setLng] = useState<number>(143.8503);
  const [lat, setLat] = useState<number>(-37.5622);
  const [hazardType, selectHazardType] = useState<string>(hazardOptions[0]);

  const { data } = useSWR<HazardApiResponse>('/api/hazards', fetcher);

  const updateMapCenterCoordinates = (event: ViewStateChangeEvent): void => {
    setLat(event.viewState.latitude);
    setLng(event.viewState.longitude);
  }

  const resetHazardForm = (): void => {
    setDrawPoint(false);
  }

  const submitHazardForm = (event: FormEvent): void => {
    event.preventDefault();

    toast.promise(
      SaveHazard(lat, lng, hazardType),
      {
        loading: 'Loading...',
        success: () => `Successfully saved hazard.`,
        error: () => `Whoops! An error just occured...`,
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 5000,
          icon: '✅',
        },
      }
    );

    resetHazardForm();
  }

  const loadExtras = (event: MapboxEvent): void => {
    const map = event.target;

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    map.on('mouseenter', 'point', (e) => {
      map.getCanvas().style.cursor = 'pointer';

      if (e === null || e.features === undefined) return;

      const coordinates = e.features[0].geometry.coordinates.slice();
      const createdAt = e.features[0].properties.createdAt;
      const description = `<p>Created ${dayjs(createdAt).fromNow()}.</p>`

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates).setHTML(description).addTo(map);
    })

    map.on('mouseleave', 'point', () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });

    map.loadImage('/flood-pin.png', (error, image) => {
      if (error || image === undefined) throw error;
      map.addImage('flood-pin', image);
    })

    map.loadImage('/warning-pin.png', (error, image) => {
      if (error || image === undefined) throw error;
      map.addImage('warning-pin', image);
    })
  }

  return (
    <div>
      <Toaster />

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
            {/* Add Hazard */}
            <button
              type="button"
              onClick={() => setDrawPoint(!drawPoint)}
              className={
                `inline-flex items-center rounded-md border px-2.5 py-1.5 text-xs font-medium leading-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${drawPoint ? 'border-transparent bg-blue-600 text-white hover:bg-blue-700' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`
              }
            >
              <PencilIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Add Hazard
            </button>
            {/* Login/Logout */}
            <button
              type="button"
              className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <UserCircleIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Login
            </button>
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
            <button
              type="button"
              disabled
              className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <PencilIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Add Hazard
            </button>
            {/* Login/Logout */}
            <button
              type="button"
              disabled
              className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <UserCircleIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Login
            </button>
          </div>
        </nav>

        {/* Map */}
        <Map
          initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: 9
          }}
          onLoad={(event) => loadExtras(event)}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          onMoveEnd={updateMapCenterCoordinates}
        >
          <GeolocateControl />
          <NavigationControl />

          {/* Geojson Layer */}
          {data && (
            <Source id="hazards" type="geojson" data={data.geojson}>
              <Layer {...layerStyle} />
            </Source>
          )}

          {/* Marker */}
          {drawPoint && <Marker longitude={lng} latitude={lat} anchor="bottom" draggable={true} />}

          {/* Submit Hazard Form */}
          {drawPoint && (
            <form
              action='#'
              onSubmit={(e) => submitHazardForm(e)}
              method='POST'
              className="absolute bottom-0 right-0 left-0 max-w-xs mx-auto w-full m-8 px-6 py-4 z-20 bg-white rounded-lg shadow flex flex-col gap-4"
            >

              {/* Hazard Type */}
              <div>
                <label htmlFor="hazard-type" className="block text-sm font-medium text-gray-700">
                  Hazard Type
                </label>
                <select
                  id="hazard-type"
                  name="hazard-type"
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  defaultValue="Flooded Road"
                  onChange={(e: ChangeEvent) => selectHazardType(e.target.value)}
                >
                  {hazardOptions.map(option => <option key={option}>{option}</option>)}
                </select>
              </div>

              {/* Notes; for Other Hazard Type */}
              {hazardType === "Other" && (
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <div className="mt-1">
                    <textarea
                      rows={4}
                      placeholder="Any notes that may be helpful to identify the hazard... optional."
                      name="notes"
                      id="notes"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      defaultValue={''}
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="w-full flex justify-end gap-3">
                {/* Reset */}
                <button
                  type="button"
                  onClick={() => resetHazardForm()}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Reset
                </button>
                {/* Create */}
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Create
                </button>
              </div>

            </form>
          )}
        </Map>
      </main>
    </div>
  )
}

export default App
