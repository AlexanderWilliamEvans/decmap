import L from 'leaflet';
import './AddLayer.scss';

/**
 *
 * Description: A customized leaflet control used to select/toggle what type of markers to display in the map. Written in leaflets latest stable version, 1.7, released on November 17 and ES6 > .
 * The control is designed for react version 16.8 (with hooks) and Redux to update the state
 *
 * Summary: TBT
 *
 * Author: Alexander Evans, Software Developer/IT-Consultant, Decerno Vast AB, Goteborg, Sweden, 2019.
 *
 * @param: {Object} map      The map to attach the Control to.
 * @param: {Object} options  A collections of multiple options.
 *
 */
export function addLayerControl(map, options){

    const addLayerIcon = require('./assets/layers-24px.svg');
    const  AddLayer= L.Control.extend({
        options: {
            position: 'topleft',
            map: undefined,
            icon: addLayerIcon,
            addLayerClosed: true,
        },

        initialize (map, options) {
            debugger;
            L.Util.setOptions(this, options);

        },

        //Events for all components in the Leaflet Control.
        addEvents(container, selector){
            container.addEventListener('click', ()=>{
                this.toggleAddLayer();
            });
        },

        onAdd (map) {
            // create the control container with a particular class name
            const container = L.DomUtil.create('div', 'addLayer-control');
            container.classList.add('leaflet-bar');
            const iconImg = L.DomUtil.create('img', 'addLayer-icon');
            iconImg.src = this.options.icon;
            iconImg.alt = 'Not found';
            container.append(iconImg);
            this.addEvents(container);

            return container;
        },

        toggleAddLayer(){
            if(this.options.addLayerClosed){

                this.openAddLayer();

            }
            else{
                this.closeAddLayer();

            }
        },

        openAddLayer(){
            document.getElementsByClassName('addLayer-icon')[0].style.backgroundColor = "#3293a8";
            this.options.addLayerClosed = false;
        },
        closeAddLayer(){
            document.getElementsByClassName('addLayer-icon')[0].style.backgroundColor = "#ffffff";
            this.options.addLayerClosed = true;
        },
    });

    return (
        map.addControl(new AddLayer(map, options))
    );
}

