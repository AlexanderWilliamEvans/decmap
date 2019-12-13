import L from 'leaflet';

/*
 * L.ControlLayerExt is an extention for the L.control.layer, this will allow the controller to select different layers programatically.
 */

export function addControlLayerExt(a, map){
    const ControlLayerExt = L.Control.Layers.extend({

        pickLayer(layerName) {
            let layerId = 0;

            for(var i in this._layers) {
                if (this._layers[i].name === layerName) {
                    layerId = i;
                    break;
                }
            }

            if (layerId !== 0) {
                var elements = this._section.children;
                for (var index = 0; index < elements.length; index++) {
                    var elem = elements[index];
                    if (elem !== null && elem.layerId === layerId) {
                        //elements[index].click();
                        //this.fireEvent(elements[index], 'click');
                        elem.checked = true;
                        this._onInputClick(false);

                        return;
                    }
                }
            }
        },

        pickLayerByPosition(layerPos) {
            if (isNaN(layerPos) || layerPos < 0) {
                return;
            }

            var elements = this._section.elements;
            if (layerPos < elements.length) {
                //elements[layerPos].click();
                //this.fireEvent(elements[layerPos], 'click');
                elements[layerPos].checked = true;
                this._onInputClick(false);
                return;
            }
        },



        // overwriting this method as I don't want to refocus on map every time
        // the method is exactly as the one in leaflet, just added the focuseOnMap part
        _onInputClick(focusOnMap) {
            var i, input, obj,
                inputs = this._section.getElementsByTagName('input'),
                inputsLen = inputs.length;
            if (focusOnMap === false) {
                /*do nothing*/
            } else {
                focusOnMap = true;
            }

            this._handlingClick = true;

            for (i = 0; i < inputsLen; i++) {
                input = inputs[i];
                //obj = this._layers[input.layerId];
                if (this._layers[i].layer._leaflet_id === input.layerId) {
                    obj = this._layers[i];
                }

                if (input.checked && !this._map.hasLayer(obj.layer)) {
                    this._map.addLayer(obj.layer);

                } else if (!input.checked && this._map.hasLayer(obj.layer)) {
                    this._map.removeLayer(obj.layer);
                }
            }

            this._handlingClick = false;

            if (focusOnMap) {
                this._refocusOnMap();
            }
        },

    });

    debugger;

    return ControlLayerExt.prototype.onAdd.call(a, map);

}


