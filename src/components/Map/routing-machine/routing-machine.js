import L from 'leaflet';
import { routeIcon } from '../assets/Icons';
import './routing-machine.scss';


export function addRoutingMachine(map, options) {
    const geoLocation = L.Control.extend({
        options: {
            position: 'topleft',
            map: undefined,
            icon: routeIcon,
            opened: false,
        },

        initialize (map, options) {
            debugger;
            L.Util.setOptions(this, options);
            this.options.map = map;

        },

        //Events for all components in the Leaflet Control.
        addEvents(container){
            container.addEventListener('click', ()=>{
                this.toggleGeoLocation()
            });
        },

        onAdd (map) {
            // create the control container with a particular class name
            const container = L.DomUtil.create('div', 'geoLocation-control');
            container.classList.add('leaflet-bar');
            const iconImg = L.DomUtil.create('img', 'geoLocation-icon');
            iconImg.src = routeIcon;
            iconImg.alt = 'Not found';
            container.append(iconImg);
            this.addEvents(container);
            return container;
        },

        toggleGeoLocation(){
            if(this.options.geoLocationClosed){
                debugger;
                this.options.map.on('locationfound', this.getGeoLocation);
                document.getElementsByClassName('geoLocation-icon')[0].style.backgroundColor = "#3293a8";
                this.options.geoLocationClosed = false;
                map.locate({setView: true, maxZoom: 18});
            }
            else {
                document.getElementsByClassName('geoLocation-icon')[0].style.backgroundColor = "#ffffff";
                this.options.geoLocationClosed = true;
                this.options.map.off('locationfound', this.getGeoLocation);
            }
        },
        getGeoLocation(e){
            try{
                let radius = e.accuracy;
                debugger;
                L.marker(e.latlng).addTo(this.options.map)
                    .bindPopup("You are within " + radius + " meters from this point").openPopup();
                L.circle(e.latlng, radius).addTo(this.options.map);
            }
            catch(error){
                console.error("Failed to get location " + error.toString());
            }
        },


    });

    return (
        map.addControl(new geoLocation(map, options))
    );
}