import L from 'leaflet';
import './CustomLayerControl.scss'

export function addCustomControl(map, baseLayers, overlays, options){
    const customControl = L.Control.Layers.extend({
        options: {
           position: 'bottomleft'
        },

        onAdd() {
            this._initLayout();
            this._update();
            this._isExpandable = false;
            return this._container;
        },



       toggleLayerControl(e){
          // L.DomEvent.stop(e);
           if (this._isExpandable) {
               this._expand();
           } else {
               this._collapse();
           }
           this._isExpandable = !this._isExpandable;
       },
    });

    return (
        map.addControl(new customControl(baseLayers, options))
    );
}

