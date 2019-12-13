import React, { useState, useEffect} from 'react';
import L from 'leaflet';
import './FilterDropdown.css';
import { filterIcon} from '../assets/Icons';







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
export function addFilterDropdown(map, options){

    const FilterDropDown = L.Control.extend({
        options: {
            position: 'topleft',
            icon: '',
            selectorClosed: true,
            selectMarkerTypes: undefined,
            selectFunction: undefined,
            selectedValue: 'caseType',
        },

        initialize (foo, options) {
            debugger;
            L.Util.setOptions(this, options);

        },

        //Events for all components in the Leaflet Control.
        addEvents(container, selector){
            container.addEventListener('click', ()=>{
                this.toggleSelect();
            });
            selector.addEventListener('change', (event) => {
                debugger;
                try{
                    if(this.options.selectFunction !== undefined){
                        debugger;
                        this.options.selectFunction(event.target.value);
                    }
                    //  setState({ selectedOptions: event.target.value});
                }
                catch(err){
                    console.error(`Failed to set value: ${  err.toString()}`);
                }
            });
        },

        onAdd (map) {
            // create the control container with a particular class name
            const container = L.DomUtil.create('div', 'filter-dropdown-control');
            container.classList.add('leaflet-bar');
            const iconImg = L.DomUtil.create('img', 'filter-dropdown-icon');
            iconImg.src = filterIcon;
            iconImg.alt = 'Not found';
            container.append(iconImg);
            const selectorWrapper = L.DomUtil.create('div', 'filter-dropdown-select-wrapper');
            const selector = L.DomUtil.create('select', 'filter-dropdown-select');
            selectorWrapper.append(selector);
            //container.append(selector);
            const mapQ = document.getElementById('map');
            mapQ.append(selectorWrapper);
            this.addSelectorOptions(selector);
            this.addEvents(container, selector);

            return container;
        },

        toggleSelect(){
            if(this.options.selectorClosed){

                this.openSelector();

            }
            else{
                this.closeSelector();

            }
        },

        openSelector() {
            document.getElementsByClassName('filter-dropdown-select-wrapper')[0].classList.add('filter-dropdown-select-wrapper-open');
            document.getElementsByClassName('filter-dropdown-icon')[0].style.backgroundColor = "#3293a8";
            this.options.selectorClosed = false;
        },
        closeSelector() {
            document.getElementsByClassName('filter-dropdown-select-wrapper')[0].classList.remove('filter-dropdown-select-wrapper-open');
            document.getElementsByClassName('filter-dropdown-icon')[0].style.backgroundColor = "#ffffff";
            this.options.selectorClosed = true;
        },
        addSelectorOptions(selector) {
            this.options.selectOptions.forEach(option => {
                const opt = L.DomUtil.create('option');
                opt.text = option.label;
                opt.value = option.value;
                selector.add(opt);
                selector.setAttribute("value", opt.value);
            });
        }
    });

    return (
        map.addControl(new FilterDropDown(map, options))
    );
}

