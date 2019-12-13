import L from 'leaflet';

const mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

const grayscale = L.tileLayer(mbUrl, { id: 'mapbox.light', attribution: mbAttr });
const streets = L.tileLayer(mbUrl, { id: 'mapbox.streets', attribution: mbAttr });
const blackAndWhite = L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', { attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' });
const googleSatelite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] });
const googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] });

const osm = { 
    "Svartvit": L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', { attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }),
};

const mapbox = {
    "Baskarta": L.tileLayer(mbUrl, { id: 'mapbox.streets', attribution: mbAttr }),
    "Gråskala": L.tileLayer(mbUrl, { id: 'mapbox.light', attribution: mbAttr }), 
};
    
const google = {
    "Satelit": L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }),
    "Hybrid": L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] })
};

const layers = {
    "Baskarta": streets,
    "Gråskala": grayscale,
    "Hybridkarta (Google)": googleHybrid,
    "Satellit (Google)": googleSatelite,
    "Svartvit": blackAndWhite
};

export const defaultLayer = streets;
// export const tileLayers = L.control.layers(layers);

export const tileLayers = {
    label: 'Kartlager',
    children: [
        {
            label: 'Openstreet map',
            children: [
                {
                    label:'Baskarta' ,
                    layer: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    })
                },
                {
                    label: 'Svartvit',
                    layer: L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', { attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' })
                },
                {
                    label:'Topografisk Karta',
                    layer:L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',  {
                        maxZoom: 17,
                        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                    })
                },
                {
                    label:'Cykelkarta',
                    layer:  L.tileLayer('https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
                        maxZoom: 20,
                        attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    })
                },
                {
                    label: 'Vägkarta',
                    layer:  L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    })
                },
                {
                    label: 'Landskap',
                    layer:L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}', {
                        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        apikey: '<your apikey>',
                        maxZoom: 22
                    })
                }
            ]
        },
        {
            label: 'Mapbox',
            children: [
                {
                    label: 'Baskarta',
                    layer: L.tileLayer(mbUrl, { id: 'mapbox.streets', attribution: mbAttr })
                },
                {
                    label: 'Gråskala',
                    layer: L.tileLayer(mbUrl, { id: 'mapbox.light', attribution: mbAttr })
                }
            ]
        },
        {
            label: 'Google',
            children: [
                {
                    label: 'Satelit',
                    layer: L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }),       
                },
                {
                    label: 'Hybrid',
                    layer: L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] })
                }
            
            ]
        }
    ]
};
   