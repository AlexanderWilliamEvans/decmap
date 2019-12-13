import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { tileLayers } from '../TileLayers/TileLayers';
import { wmsLayers } from '../WmsLayers/WmsLayers';
import './Control.LayerTree';
import './LayerTree.css';

const baseLayers = {
    label:'Lager',
    children:[
        {
            label: tileLayers.label,
            children: tileLayers.children
        },
        {
            label: wmsLayers.label,
            children: wmsLayers.children
        }
    ]
};

export const layerTree = L.control.layers.tree(tileLayers, wmsLayers);

