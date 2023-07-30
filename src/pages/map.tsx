import Layout from '../components/Layout.tsx';
import * as L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../hooks/useAuth.ts';
import { setElementAttr } from '../utils/setElementAttr.ts';
import { Helmet } from 'react-helmet-async';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

const requestGeoLocationPermission = async () => {
  const result = await navigator.permissions.query({ name: 'geolocation' });
  return result.state;
};

const getLocation = async (): Promise<L.LatLngExpression> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latlng = [position.coords.latitude, position.coords.longitude] as L.LatLngExpression;
      resolve(latlng);
    }, (err) => {
      reject(err);
    });
  });
};


const createUserInfoPopup = ({ pictureUrl, displayName }: {
  pictureUrl: string,
  displayName: string
}) => {
  const container = document.createElement('div');
  const img = document.createElement('img');
  const h3 = document.createElement('h3');
  setElementAttr(img, { src: pictureUrl, style: 'width: 100px; height: 100px;', alt: 'user picture' });
  setElementAttr(h3, { style: 'text-align: center;' });
  h3.textContent = displayName;
  container.append(img, h3);
  return container;
};

const MapPage = () => {
  const { profile } = useAuth();

  const leafletWrap = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map>();
  const [geoPermissionStatus, setGeoPermissionStatus] = useState<PermissionStatus['state'] | null>(null);

  const setUserLocationAndMarker = useCallback(async () => {
    if (!mapRef.current || !profile) {
      return;
    }
    const latlng = await getLocation();
    const marker = L.marker(latlng).addTo(mapRef.current);
    mapRef.current?.setView(latlng, 19);
    marker.bindPopup(createUserInfoPopup({ ...profile }));
  }, [profile]);

  // handle permission
  useEffect(() => {
    (async () => {
      const status = await requestGeoLocationPermission();
      setGeoPermissionStatus(status);
    })();
  }, []);

  // init leaflet
  useEffect(() => {
    if (!leafletWrap.current) return;
    mapRef.current = L.map(leafletWrap.current, {});
    tiles.addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (geoPermissionStatus === 'denied') {
      return;
    }
    setUserLocationAndMarker();
  }, [geoPermissionStatus, setUserLocationAndMarker, profile]);

  return (
    <Layout>
      <Helmet>
        <title>Map</title>
      </Helmet>
      {geoPermissionStatus === 'denied'
        ? <button className="btn btn-outline-primary" onClick={setUserLocationAndMarker}>
          Grant geolocation permission
        </button>
        : <div className="vw-100 vh-100" ref={leafletWrap} />
      }

    </Layout>
  );
};

export default MapPage;
