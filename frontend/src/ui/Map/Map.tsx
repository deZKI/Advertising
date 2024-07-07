import React from 'react';
import 'leaflet/dist/leaflet.css';
import './map.css';
import {MapContainer, TileLayer, Marker} from 'react-leaflet';
import {getIconByType} from '../../utils/getIconByType';
import {TCSVData} from '../../types/csvData.type';
import {TItem} from '../../types/item.type';
import {TMode} from '../../types/mode.type';

type TMap = {
  item: TItem;
  list: TItem[];
  csvData: TCSVData;
  modeSwitcher: TMode;
  panelIsSwitched: boolean;
}

export default function Map({
  item,
  list,
  csvData,
  modeSwitcher,
  panelIsSwitched
}: TMap) {
  return (
    <MapContainer 
      className="leaflet"
      center={
        panelIsSwitched 
          ? [item.coordinate.latitude, item.coordinate.longitude] 
          : [55.751244, 37.618423]
      }
      zoom={panelIsSwitched ? item.zoom : 10}
      key={`${panelIsSwitched}`}
    >
      <TileLayer 
        className="leaflet__tiles"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Object.keys(csvData).length !== 0 && modeSwitcher === "banners" 
        ? csvData.points.map((point) => 
            <Marker 
              position={[point.lat, point.lon]} 
              icon={getIconByType(csvData.type)}
              key={point.id}
            />
          )
        : list.map((item) => 
            <Marker 
              position={[item.coordinate.latitude, item.coordinate.longitude]} 
              icon={getIconByType(item.type)}
              key={item.id}
            />
          )
      }
    </MapContainer>
  );
}
