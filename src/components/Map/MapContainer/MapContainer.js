import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'reactstrap';
import L from 'leaflet';
import './MapContainer.css';
//import "react-leaflet-markercluster/dist/styles.min.css";
import "leaflet-draw/dist/leaflet.draw-src.css";
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "leaflet.markercluster";
//import { addMarkerCluster } from '../Markercluster';
import { addFilterDropdown} from '../FilterDropDown/FilterDropdown';
import { addLayerControl } from '../AddLayer/AddLayer';
import { addExpandableLayerControl } from "../ExpandableLayerControl/L.Control.ExpandableLayerControl";
import { addGeoLocation } from '../GeoLocation/GeoLocation';
import { addGridDraw } from '../GridDraw/L.Control.GridDraw';
import { addCustomControl } from '../ExpandableLayerControl/CustomLayerControl/CustomLayerControl';
/**
 *
 * * Summary: A leaflet map with multiple controls, redux and hooks.
 *
 * * Description: TBT
 *
 * * @param {object} props          a collection of values (properties) for the map.
 *
 *  * @yield {type} TBT
 *
 *  * @return {type} Returns a leaflet map.
 *
 */
export default function MapContainer(props) {
    const defaultLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'});
    const blackandWhite = L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', { attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' });
    const baseMaps = {
        'baskarta': defaultLayer,
        'svartvit': blackandWhite
    };
    const map = useRef(null);
    const {markers} = props;
    const [selectOptions, setSelectOptions] = useState(  [
        {value:'caseType', label:'Ärendetyp'},
        {value:'deep', label: 'Grävdjup'},
        {value: 'risk', label: 'Risk'},
        {value: 'open', label: 'Öppet'}
    ]);

    // Sets the maps maxbounds.
    const southWest = L.latLng(52.71, 5.36);
    const northEast = L.latLng(70.12, 28.07);
    const bounds = L.latLngBounds(southWest, northEast);

    const getMarkersWithinBoundingBox = () => {
        const visibleMarkers = [];
        try{
            map.current.eachLayer((layer) => {
                if (layer instanceof L.Marker && map.current.getBounds().contains(layer.getLatLng())) {
                    if(typeof layer.getAllChildMarkers === 'function'){
                        const clusterMarkers =  layer.getAllChildMarkers();
                        clusterMarkers.forEach((clusterMarker) =>{
                            visibleMarkers.push(clusterMarker);
                        });
                    }
                    else {
                        visibleMarkers.push(layer);
                    }
                }
            });
        }
        catch(e){
            console.error(e.toString());
        }
        // addMarkerCluster(visibleMarkers, markerCaseTypes[caseType], map.current).addTo(map.current);
    };

    const selectFunction = (markerType) => {
        debugger;
        //  map.current._panes.markerPane.remove();
        map.current.eachLayer((layer) =>{
            if(layer instanceof L.Marker){
                map.current.removeLayer(layer);
                if(typeof layer.getAllChildMarkers === 'function'){
                    // layer.clearLayers();
                    map.current.removeLayer(layer);

                }
                else{
                    map.current.removeLayer(layer);
                }

            }

        });
        //  addMarkerCluster(markers, markerType).addTo(map.current);
    };

    useEffect(() => {
        map.current = L.map('map', {
            zoomControl: false,
            center: [62.38, 16.30],
            zoom: 6,
            minZoom: 6,
            maxBounds: bounds,
            layers: [defaultLayer],
            zoomToBoundsOnClick: false
        }).fitBounds(bounds);

        L.control.zoom({position: 'topleft'}).addTo(map.current);
        addFilterDropdown(map.current,{
            selectOptions, selectFunction
        });
        L.control.scale({ position: 'bottomright' }).addTo(map.current);
        L.control.fullscreen({ position: 'topleft', title: 'Helskärmsläge' }).addTo(map.current);

        //Custom controls, just for RC.
       /* const layerControl = addExpandableLayerControl(map.current, baseMaps, null, {
            position: 'bottomright',
            collapsed: true
        });*/

        addCustomControl(map.current, baseMaps);
        addLayerControl(map.current, null);
        addGeoLocation(map.current, null);
        addGridDraw(map.current);

        // Customs Controls added to map.
      //  addMarkerCluster(markers, 'caseType').addTo(map.current);

        map.current.on('dragend zoom', ()=>{
            getMarkersWithinBoundingBox();
        });
    }, []);

    return (
        <Container fluid>
            <div id="map"/>
        </Container>
    );
}

