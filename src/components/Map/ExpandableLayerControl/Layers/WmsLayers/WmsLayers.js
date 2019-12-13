import L from 'leaflet';
import proj4 from 'proj4';
import { getWms } from '../../../../api/api';

const defaultParameters = { };

export const wmsLayers = 
    {
        label: 'WMS',
        children:[
            {
                label:'Testing',
                layer: L.tileLayer.wms('http://incheck.decerno.se:8080/geoserver/web/', {
                    layers: 'ne:ne'
                })
            }
           
        ]
    };

/* export const wmsLayers  = () => {
    const layers = [];
    return (
        layers.push(getWms()));
    );
} */

