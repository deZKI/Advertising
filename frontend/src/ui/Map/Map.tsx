import React from 'react';
import 'leaflet/dist/leaflet.css';
import './map.css';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import {getIconByType} from '../../utils/getIconByType';
import {TItem} from '../../types/item.type';

type TMap = {
  list: TItem[];
}

export default function Map({ list }: TMap) {
  return (
    <MapContainer className="leaflet" center={[55.751244, 37.618423]} zoom={12}>
      <TileLayer 
        className="leaflet__tiles"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {list.map((item) => 
        <Marker 
          position={[item.coordinate.latitude, item.coordinate.longitude]} 
          icon={getIconByType(item.type)}
        >
          <Popup>{item.address}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
