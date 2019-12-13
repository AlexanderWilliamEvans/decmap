import L from 'leaflet';
import { squareGrid, pointGrid, hexGrid, triangleGrid } from '@turf/turf';
import './L.Control.GridDraw.css';
import { filterIcon} from '../assets/Icons';

/**
 *
 * Description: A customized leaflet control to draw areas by clicking on grids. Written in leaflets latest stable version, 1.6, released on November 17 and ES6 > .
 * Note: Not supported in IE11 and older/other browser without ES6> support, use Babel JS if this is required.
 * Dependencies: Leaflet (1.6 recommended) and Turf JS (5.1.6 recommended).
 *
 * Summary: TBT
 *
 * Author: Alexander Evans, Software Developer/IT-Consultant, Decerno Vast AB, Goteborg, Sweden, 2019.
 *
 * @param: {Object} map      The map to attach the Control to.
 * @param: {Object} options  A collections of multiple options.
 *
 */
export function addGridDraw(map, options){

    const GridDraw = L.Control.extend({
        options: {
            map: undefined,
            gridOptions:{
                bbox: undefined,
                cellSide: 50,
                options: {
                    units: 'meters'
                },
                style: {
                    "color": "#ff7800",
                    weight: 1,
                    fillOpacity: 0
                }
            },
            grid: undefined,
            position: 'topleft',
            icon: '',
            gridDrawClosed: true,
            drawedArea: undefined,
            selectMarkerTypes: undefined,
        },

        initialize (map, options) {
            this.options.map = map;
            L.Util.setOptions(this, options);

        },

        //Add eventListeners for all components in the Leaflet Control.
        addEvents(container){
            container.addEventListener('click', ()=>{
                this.toggleGridDraw();
            });

            this.options.map.on('dragend zoom', this.getMapBounds);

        },

        //Remove eventListeners for objects added in the map.
        removeEvents(){

        },

        onAdd (map) {
            // create the control container with a particular class name
            const container = L.DomUtil.create('div', 'gridDraw-control');
            container.classList.add('leaflet-bar');
            const iconImg = L.DomUtil.create('img', 'gridDraw-icon');
            iconImg.src = filterIcon;
            iconImg.alt = 'Not found';
            container.append(iconImg);

            this.addEvents(container);

            return container;
        },

        openGridDraw(){
            try{
                    if(this.options.gridOptions.bbox === undefined){
                        this.options.gridOptions.bbox = this.getMapBounds();
                    }
                    const grid = this.turfGrid('triangle',[52, 11, 53,12] , 70, this.options.gridOptions.options);
                    this.options.grid = L.geoJSON(grid, {style:this.options.style});
                        //squareGrid(this.options.gridOptions.bbox, this.options.gridOptions.cellSide, this.options.gridOptions.options);

                    this.options.map.addLayer(this.options.grid);
                    document.getElementsByClassName('gridDraw-icon')[0].style.backgroundColor = "#3293a8";
                    this.options.gridDrawClosed = false;
            }
            catch(e){
                // eslint-disable-next-line no-console
                console.error(`failed to open grid draw: ${  e.toString()}`);
            }

        },

        closeGridDraw(){
            try{
                document.getElementsByClassName('gridDraw-icon')[0].style.backgroundColor = "#ffffff";
                this.options.gridDrawClosed = true;
            }
            catch(e){
                // eslint-disable-next-line no-console
                console.error(`failed to open grid draw: ${  e.toString()}`);
            }

        },

        toggleGridDraw(){
            debugger;
            if(this.options.gridDrawClosed){
                this.openGridDraw();
            }
            else{
                this.closeGridDraw();
            }
        },
        turfGrid(pattern, extent, width, options) {
            if (pattern === 'hex') {
                return hexGrid(extent, width, options);
            } else if (pattern === 'triangle') {
                return triangleGrid(extent, width, options);
            } else if (pattern === 'point') {
                return pointGrid(extent, width, options);
            }
            return squareGrid(extent, width, options);
        },
        getMapBounds(){
            try{
                const gridBounds = [];
                const bbox = this.options.map.getBounds();
                gridBounds.push(bbox._northEast.lat);
                gridBounds.push(bbox._northEast.lng);
                gridBounds.push(bbox._southWest.lat);
                gridBounds.push(bbox._southWest.lng);
                return gridBounds;
            }
            catch(e){
                console.error(`failed to get bounding box for grid: ${  e.toString()}`);
            }
        },

    });

    return (
        map.addControl(new GridDraw(map, options))
    );
}
