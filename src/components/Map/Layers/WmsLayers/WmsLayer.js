import L from 'leaflet';
import { CRS } from 'proj4leaflet';


const apiKey = '';

const wmsTileSettings = {
    format: 'image/png',
    crs: 'EPSG:4326',
    transparent: false,
    version: '1.1.1',
    uppercase: 'false'
};

const layers = [{
    url: "http://maps-ver.lantmateriet.se/topowebb/wms/v1?request=GetCapabilities&version=1.1.1&service=wms",
    layer: "topowebbkartan",
    format: 'image/png',
    crs: 'EPSG:4326',
    transparent: false,
    version: '1.1.1',
    uppercase: 'false'
},
    {
        url: "http://maps-ver.lantmateriet.se/topowebb/wms/v1?request=GetCapabilities&version=1.1.1&service=wms",
        layer: "topowebbkartan_nedtonad",
        format: 'image/png',
        crs: 'EPSG:4326',
        transparent: false,
        version: '1.1.1',
        uppercase: 'false'
    }];


export const getMapCapabilities = () => {

};

//Gets all tilelayers from wms server and push them into an array.
export const getMap = (layer) => {
    const tileLayers = [];
    layers.forEach(layer  = () =>{
        try{
            tileLayers.push(layer);
            L.tileLayer.wms(layer.url, {
                layers: layer.layers,
                format: layer.format ? layer.format : wmsTileSettings.format,
                transparent: layer.transparent ? layer.transparent : wmsTileSettings.transparent,
                version: layer.version ? layer.version : wmsTileSettings.version,
                crs: layer.crs ? layer.crs : wmsTileSettings.crs
            });

        }
        catch(e){
            console.error(`Failed to add wms to map ${e.toString()}`);
        }

    }
    );


};

export default function WmsLayers(){


  const wmsLayer = L.tileLayer.wms('https://demo.boundlessgeo.com/geoserver/ows?', {
        layers: 'ne:ne'
    }).addTo();


    return(
    <div>

    </div>
    );
}
