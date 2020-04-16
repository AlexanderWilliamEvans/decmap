import L from 'leaflet';
import React from 'react'
import { addFilterDropdown} from './FilterDropDown/FilterDropdown';
import { addLayerControl } from './AddLayer/AddLayer';
import { addExpandableLayerControl } from "./ExpandableLayerControl/L.Control.ExpandableLayerControl";
import { addGeoLocation } from './GeoLocation/GeoLocation';
import { addGridDraw } from './GridDraw/L.Control.GridDraw';
import { addCustomControl } from './ExpandableLayerControl/CustomLayerControl/CustomLayerControl';
import { addSidebar } from './Sidebar/L.Control.Sidebar';
import { addRoutingMachine } from './routing-machine/routing-machine';
import { addPinpoint } from './pinpoint/pinpoint';
import { addToolbox } from './toolbox/toolbox';

export const mapEngine = (id) => {
    
    return(
        <div id = {id}/>
    );
}