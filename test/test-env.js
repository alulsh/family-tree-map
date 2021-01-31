import { jest } from '@jest/globals';

const mockMarker = jest.fn(function createMarkerMock() {
  return {
    getElement() {
      return document.createElement('div');
    },
    setLngLat() {
      return this;
    },
    addTo() {
      return this;
    },
    setPopup() {
      return this;
    },
  };
});

global.mapboxgl = {
  accessToken:
    'pk.eyJ1IjoiYWx1bHNoIiwiYSI6ImNra2JmZHplYzBjcXgyd291M3l2aWIxODAifQ.uCZpVDpR-z3BEUV0R7S1NA',
  Map: jest.fn(() => ({
    addControl: jest.fn(),
  })),
  Marker: mockMarker,
  Popup: jest.fn(() => ({
    setHTML: jest.fn(),
  })),
};

global.MapboxGeocoder = jest.fn();
