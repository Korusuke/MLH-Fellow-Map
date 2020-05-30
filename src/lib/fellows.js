import React from 'react';
import { renderToString } from 'react-dom/server';
import L from 'leaflet';
import axios from 'axios';
import { FaGift } from 'react-icons/fa';

import { isDomAvailable, numberWithCommas } from 'lib/util';

const santasRouteApiEndpoint =
    'https://firebasestorage.googleapis.com/v0/b/santa-tracker-firebase.appspot.com/o/route%2Fsanta_en.json?alt=media&2018b';

let giftIconDiv;
let santaIconDiv;

if (isDomAvailable()) {
    const iconGift = <FaGift />;
    const iconGiftString = renderToString(iconGift);

    giftIconDiv = L.divIcon({
        className: 'icon',
        html: `<div class="icon-gift">${iconGiftString}</div>`,
        iconSize: 20
    });

    santaIconDiv = L.divIcon({
        className: 'icon',
        html: `<div class="icon-santa">🎅</div>`,
        iconSize: 50
    });
}

export async function addFellows(map) {
    let activeSantasRoute;

    try {
        activeSantasRoute = await getSantasRoute();
    } catch (e) {
        console.error('Failed to get Santa and their route', e);
        return;
    }

    const { destinations = [] } = activeSantasRoute;
    const stops = desintationsWithStops(destinations);
    const deliveries = desintationsWithPresents(stops);

    if (deliveries.length === 0) {
        const center = new L.LatLng(0, 0);
        const noSanta = L.marker(center, {
            icon: santaIconDiv
        });

        noSanta.addTo(map);
        noSanta.bindPopup(`Santa's still at the North Pole!`);
        noSanta.openPopup();

        return;
    }

    const santasLocation = getCurrentLocation(deliveries);
    const stopsGeoJson = geoJsonPointsFromDestinations(deliveries);
    const stopsLatLngs = latLngsFromDesintations(deliveries);

    const santaRoute = new WrappedPolyline(stopsLatLngs, {
        weight: 2,
        color: 'green',
        opacity: 1,
        fillColor: 'green',
        fillOpacity: 0.5
    });

    const santaStops = new L.geoJson(stopsGeoJson, {
        type: 'deliveryStop',
        pointToLayer: deliveryPointToLayer
    });

    const santa = L.marker(santasLocation, {
        icon: santaIconDiv,
        zIndexOffset: 999,
        riseOnHover: true
    })
        .bindPopup(`Santa!`)
        .openPopup();

    santaRoute.addTo(map);
    santaStops.addTo(map);
    santa.addTo(map);

    return santasLocation;
}

/**
 * getSantasRoute
 * @description Given our active Santa, find their route
 * @param {object} santa An active Santa
 */

async function getSantasRoute(santa = {}) {
    const { route = santasRouteApiEndpoint } = santa;
    let santasRoute;

    if (!route) return;

    try {
        santasRoute = await axios.get(route);
    } catch (e) {
        throw new Error(`Failed to get Santa's route: ${e}`);
    }

    const { data } = santasRoute;

    return data;
}

/**
 * getCurrentLocation
 * @description Gets Santa's current location based on the known deintations
 */

function getCurrentLocation(destinations) {
    const stops = desintationsWithStops(destinations);
    const length = stops.length;
    const desintation = stops[length - 1];
    return latLngsFromDesintations([desintation])[0];
}

/**
 * deliveryPointToLayer
 * @description Leaflet pointToLayer function that adds a custom gift marker with presents delivered popup
 */

function deliveryPointToLayer(feature = {}, latlng) {
    const { properties = {} } = feature;
    const { presentsDelivered = 0, city, region } = properties;
    const text = `
    <div class="text-center">
      <strong>${city}, ${region}</strong>
      <br />
      ${numberWithCommas(presentsDelivered)} 🎁
    </div>
  `;
    const layer = L.marker(latlng, {
        icon: giftIconDiv,
        riseOnHover: true
    }).bindPopup(text);
    return layer;
}

/**
 * desintationsWithStops
 * @decription Given an array of desintations, filters for those locations that received presents
 */

function desintationsWithStops(desintations = []) {
    return desintations.filter(({ arrival } = {}) => arrival < Date.now());
}

/**
 * desintationsWithPresents
 * @decription Given an array of desintations, filters for those locations that received presents
 */

function desintationsWithPresents(desintations = []) {
    return desintations.filter(({ presentsDelivered } = {}) => presentsDelivered > 0);
}

/**
 * geoJsonPointsFromDestinations
 * @decription Given a list of deisntations, creates a geoJson points collection
 */

function geoJsonPointsFromDestinations(desintations = []) {
    const features = desintations.map((destination = {}) => {
        const { location = {} } = destination;
        const { lat, lng } = location;
        const coordinates = [lng, lat];
        return {
            type: 'Feature',
            properties: {
                ...destination
            },
            geometry: {
                type: 'Point',
                coordinates
            }
        };
    });
    return {
        type: 'FeatureCollection',
        features: features
    };
}

/**
 * latLngsFromDesintations
 * @decription Given a list of deisntations, creates an array of LatLngs
 */

function latLngsFromDesintations(desintations = []) {
    return desintations.map((delivery) => {
        const { location } = delivery;
        const { lat, lng } = location;
        return new L.LatLng(lat, lng);
    });
}