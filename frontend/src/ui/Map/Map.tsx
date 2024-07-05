import React from 'react';
import 'leaflet/dist/leaflet.css';
import './map.css';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import {getIconByType} from '../../utils/getIconByType';
import {TItem} from '../../types/item.type';

type TMap = {
  item: TItem;
  list: TItem[];
  panelIsSwitched: boolean;
}

export default function Map({ item, list, panelIsSwitched }: TMap) {
  console.log(
    panelIsSwitched ? item.zoom : 16
  );
  return (
    <MapContainer 
      className="leaflet"
      center={
        panelIsSwitched 
          ? [item.coordinate.latitude, item.coordinate.longitude] 
          : [55.751244, 37.618423]
      } 
      zoom={panelIsSwitched ? item.zoom : 11}
      key={`${panelIsSwitched}`}
    >
      <TileLayer 
        className="leaflet__tiles"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {list.map((item) => 
        <Marker 
          position={[Number(item.coordinate.latitude), Number(item.coordinate.longitude)]} 
          icon={getIconByType(item.type)}
          key={item.id}
        >
          <Popup>{item.address}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
