import React, { useState, useEffect} from 'react';
import L from 'leaflet';
import './L.Control.Sidebar.scss';
import { filterIcon} from '../assets/Icons';



/**
*
 * Description: 
 * 
*
 * Summary: TBT
*
 * Author: Alexander Evans
*
 * @param: {Object} map      The map to attach the Control to.
 * @param: {Object} options  A collections of multiple options.
*
*/
export function addSidebar(map, options){

    L.Control.Sidebar = L.Control.extend({
        options: {
            position: 'topright',
            icon: '',
            sidebar: undefined,
            sidebarClosed: true,
        },

        initialize (foo, options) {
            debugger;
            L.Util.setOptions(this, options);

        },

        //Events for all components in the Leaflet Control.
        addEvents(container){
            container.addEventListener('click', ()=>{
                this.toggleSidebar();
            });
        },

        initSidebarMenu(){
            try {
                const sidebar = L.DomUtil.create('div', 'leaflet-sidebar-menu');

                this.options.sidebar = sidebar;

            } catch(e) {
                console.error(e);
            }
        },
        isVisible () {
            return L.DomUtil.hasClass(this.options.sidebar, 'sidebar-open');
        },

        onAdd (map) {
            // create the control container with a particular class name
            const container = L.DomUtil.create('div', 'leaflet-sidebar-control');
            container.classList.add('leaflet-bar');
            const iconImg = L.DomUtil.create('img', 'sidebar-icon');
            iconImg.src = filterIcon;
            iconImg.alt = 'Not found';
            container.append(iconImg);
            const selectorWrapper = L.DomUtil.create('div', 'leaflet-sidebar-wrapper');


            const selector = L.DomUtil.create('select', 'sidebar-select');
            selectorWrapper.append(selector);
           // const sidebar = L.DomUtil.create('div', 'leaflet-sidebar-menu');
           // this.options.sidebar = sidebar;
            //container.append(selector);
            const mapQ = document.getElementById('map');
            mapQ.append(selectorWrapper);
            mapQ.append(this.options.sidebar);
            this.initSidebarMenu();
            this.addEvents(container);

            return container;
        },

        toggleSidebar(){
            if(this.options.sidebarClosed){

                this.openSidebar();

            }
            else{
                this.closeSidebar();

            }
        },

        openSidebar() {
         //  document.getElementsByClassName('sidebar-menu')[0].classList.add('sidebar-menu-open');
            document.getElementsByClassName('sidebar-icon')[0].style.backgroundColor = "#3293a8";
            debugger;
            this.options.sidebar.classList.add('sidebar-open');
           // L.DomUtil.addClass(this.options.sidebar, 'sidebar-open');
            this.options.sidebarClosed = false;
        },
        closeSidebar() {
         //  document.getElementsByClassName('sidebar-menu')[0].classList.remove('sidebar-menu-open');
            document.getElementsByClassName('sidebar-icon')[0].style.backgroundColor = "#ffffff";
            L.DomUtil.removeClass(this.options.sidebar, 'sidebar-open');
            this.options.sidebarClosed = true;
        },
    });

    return (
        map.addControl(new L.Control.Sidebar(map, options))
    );
}