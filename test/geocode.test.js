import { jest, expect, test, afterEach } from '@jest/globals';
import $ from 'jquery';
import * as geocode from '../geocode';
import { geocodingApiMock } from './fixtures';

const ancestor = {
  name: { firstName: 'Jane', lastName: 'Doe' },
  birthPlace: 'Harrisburg,Pennsylvania,USA',
  birthDate: 'July 16, 1931',
};
const geocodeResponse = {
  placeName: 'Harrisburg, Pennsylvania, United States',
  longLat: [-76.8861, 40.2663],
  relevance: 1,
};
const nullGeocodeResponse = {
  placeName: null,
  longLat: null,
  relevance: null,
};
const geocodedAncestor = {
  birthDate: 'July 16, 1931',
  birthPlace: 'Harrisburg,Pennsylvania,USA',
  geocodedPlace: 'Harrisburg, Pennsylvania, United States',
  longLat: [-76.8861, 40.2663],
  name: { firstName: 'Jane', lastName: 'Doe' },
  relevance: 1,
};

afterEach(() => {
  jest.clearAllMocks();
});

test('Create hidden marker for geocoded ancestor', () => {
  const markerDiv = document.createElement('div');
  markerDiv.setAttribute('data-relevance', geocodedAncestor.relevance);
  markerDiv.style.visibility = 'hidden';

  const spy = jest.spyOn(geocode, 'createMarker');
  geocode.createMarker(geocodedAncestor, 'hidden');

  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveReturned();
  expect(spy).toHaveReturnedWith(markerDiv);
});

test('Create visible marker for geocoded ancestor', () => {
  const markerDiv = document.createElement('div');
  markerDiv.setAttribute('data-relevance', geocodedAncestor.relevance);
  markerDiv.style.visibility = 'visible';

  const spy = jest.spyOn(geocode, 'createMarker');
  geocode.createMarker(geocodedAncestor, 'visible');

  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveReturned();
  expect(spy).toHaveReturnedWith(markerDiv);
});

test('Geocodes birth place of an individual', () => {
  const spy = jest
    .spyOn($, 'ajax')
    .mockImplementation(({ success }) => success(geocodingApiMock));

  return geocode.geocodePerson(ancestor).then((data) => {
    expect.assertions(2);
    expect(spy).toHaveBeenCalled();
    expect(data).toEqual(geocodeResponse);
  });
});

test('geocodePerson function throws error', () => {
  const errorResponse = {
    readyState: 4,
    responseText: '{"message":"Not Authorized - Invalid Token"}',
    responseJSON: {
      message: 'Not Authorized - Invalid Token',
    },
    status: 401,
    statusText: 'Unauthorized',
  };
  const spy = jest
    .spyOn($, 'ajax')
    .mockImplementation(({ error }) => error(errorResponse));

  return geocode.geocodePerson(ancestor).catch((error) => {
    expect.assertions(2);
    expect(spy).toHaveBeenCalled();
    expect(error).toEqual(errorResponse);
  });
});

test('Updates jQuery datatable and visible marker for geocoded person', () => {
  document.body.innerHTML =
    '<input type="range" name="relevance" min="0" max="1" value="0.75" step="0.05" id="relevanceRange" oninput="updateRelevance(value)"/>' +
    '<output for="relevance" id="relevanceOutput">0.75</output>';
  const markerDiv = document.createElement('div');
  markerDiv.setAttribute('data-relevance', geocodedAncestor.relevance);
  markerDiv.style.visibility = 'visible';

  expect(geocode.updateTableAndMarker(ancestor, geocodeResponse)).toEqual(
    markerDiv
  );
});

test("Updates jQuery datatable for person who can't be geocoded", () => {
  document.body.innerHTML =
    '<input type="range" name="relevance" min="0" max="1" value="0.75" step="0.05" id="relevanceRange" oninput="updateRelevance(value)"/>' +
    '<output for="relevance" id="relevanceOutput">0.75</output>';
  const markerDiv = document.createElement('div');
  markerDiv.setAttribute('data-relevance', 0);
  markerDiv.style.visibility = 'hidden';

  expect(geocode.updateTableAndMarker(ancestor, nullGeocodeResponse)).toEqual(
    markerDiv
  );
});

test('Toggle marker visibility after updating relevance slider', () => {
  document.body.innerHTML =
    '<input type="range" name="relevance" min="0" max="1" value="0.75" step="0.05" id="relevanceRange" oninput="updateRelevance(value)"/>' +
    '<output for="relevance" id="relevanceOutput">0.75</output>';
  document.body.innerHTML +=
    '<div id="hiddenMarker" class="mapboxgl-marker" data-relevance="0.68"></div>';
  document.body.innerHTML +=
    '<div id="visibleMarker" class="mapboxgl-marker" data-relevance="0.86"></div>';
  document.body.innerHTML +=
    '<div id="missingDataMarker" class="mapboxgl-marker"></div>';
  geocode.updateMarkers();
  expect($('#hiddenMarker').css('visibility')).toBe('hidden');
  expect($('#visibleMarker').css('visibility')).toBe('visible');
  expect($('#missingDataMarker').css('visibility')).toBe('visible');
});
