import L from 'leaflet';
import { addControlLayerExt} from './L.ControlLayerExt';
import './L.Control.ExpandableLayerControl.scss';

/**
*
* Description: A customized leaflet control extension for the L.control.layer, this will allow the controller to select different layers programmatically. Written in leaflets latest stable version, 1.6, released on November 17 and ES6 > .
* Note: Not supported in IE11 and older/other browser without ES6> support, use Babel JS if this is required.
* Dependencies: Leaflet (1.6 recommended).
*
* Summary: TBT
*
* Author: Alexander Evans, Software Developer/IT-Consultant, Decerno Vast AB, Goteborg, Sweden, 2019.
*
* @param: {Object} map      The map to attach the Control to.
* @param: {Object} options  A collections of multiple options.
*
*/
export function addExpandableLayerControl(map, baseLayers, overlays, options){

    const ExpandableLayerControl = L.Control.extend({
        options: {
            map: undefined,
            layers: {
                baseLayers:{},
                overlays:{}
            },
            pickedLayer: undefined,
        },

        initialize (map, baseLayers, overlays, options) {
            debugger;
            this.options.map = map;
            this.options.layers.baseLayers = baseLayers;
            this.options.layers.overlays = overlays;
            L.Util.setOptions(this, options);

        },

        //Add eventListeners for all components in the Leaflet Control.
        addEvents(container){
            container.addEventListener('click', ()=>{

            });

        },

        //Remove eventListeners for objects added in the map.
        removeEvents(){

        },

        onAdd (map) {
            // create the control container with a particular class name
          //  const container = L.ControlLayerExt.prototype.onAdd.call(this, map);
            const container = addControlLayerExt(this, map);
            const control = L.DomUtil.create('div', 'expandable-layer-control-container');

            const title = L.DomUtil.create('span', 'expandable-layer-title', control);
            title.textContent = 'Lagerväljare';

            const button = L.DomUtil.create('a', 'expandable-layer-collapse', control);
            L.DomEvent.on(button, 'click', this.toggleExpandable, this);

            this._expandableLayerIcon = L.DomUtil.create('i', 'fa fa-bars', button);

            L.DomUtil.create('div', 'clearfix', control);
            this._section.insertAdjacentElement('beforebegin', control);

            this._isExpandable = false;
            return container;
        },

        toggleExpandable() {
            if (this._isExpandable) {
                this._expand();
            } else {
                this._collapse();
            }
            this._isExpandable = !this._isExpandable;

        },

    });

    return (
        map.addControl(new ExpandableLayerControl(map, baseLayers, overlays, options))
    );
}

