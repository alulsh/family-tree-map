import $ from 'jquery';
import dt from 'datatables.net';
import 'datatables.net-dt/css/jquery.datatables.css';
import { getName, getBirthInfo, processDate } from './family-tree';

dt();

const dataTable = $('#ancestor-table').DataTable();
mapboxgl.accessToken =
  'pk.eyJ1IjoiYWx1bHNoIiwiYSI6ImNra2JmZHplYzBjcXgyd291M3l2aWIxODAifQ.uCZpVDpR-z3BEUV0R7S1NA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [1, 1],
  zoom: 1.5,
});

map.addControl(
  new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl })
);

function updateMarkers() {
  const markers = $('.mapboxgl-marker');

  if (markers.length !== 0) {
    $(markers).each(function toggleMarkerVisibility(index, marker) {
      const markerRelevance = $(marker).data('relevance');
      const foundMarker = marker;
      if (markerRelevance < $('#relevanceRange').val()) {
        foundMarker.style.visibility = 'hidden';
      } else {
        foundMarker.style.visibility = 'visible';
      }
    });
  }
}

function geocodePerson(person) {
  return new Promise((resolve, reject) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${person.birthPlace}.json?limit=1&access_token=${mapboxgl.accessToken}`;
    $.ajax({
      url: geocodeURL,
      type: 'GET',
      success(data) {
        let longLat = null;
        let placeName = null;
        let relevance = null;

        if (data.features.length === 1) {
          const firstFeature = data.features[0];
          longLat = firstFeature.center;
          placeName = firstFeature.place_name;
          relevance = firstFeature.relevance;
        }

        resolve({ longLat, placeName, relevance });
      },
      error(error) {
        reject(error);
      },
    });
  });
}

function createMarker(person, visibility) {
  const marker = new mapboxgl.Marker()
    .setLngLat(person.longLat)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<p>Name: ${person.name.firstName} ${person.name.lastName}</br>
      Birth place: ${person.birthPlace}</br>
      Birth date: ${person.birthDate}</br>
      Geocoding result: ${person.geocodedPlace}</br>
      Relevance: ${person.relevance}</p>`
      )
    )
    .addTo(map);

  const markerHTML = marker.getElement();
  markerHTML.setAttribute('data-relevance', person.relevance);
  markerHTML.style.visibility = visibility;

  return markerHTML;
}

function updateTableAndMarker(person, geocodingResults) {
  const geocodedPerson = person;
  geocodedPerson.longLat = geocodingResults.longLat;
  geocodedPerson.relevance = geocodingResults.relevance;
  geocodedPerson.geocodedPlace = geocodingResults.placeName;

  if (geocodedPerson.longLat === null) {
    geocodedPerson.relevance = 0;
    geocodedPerson.geocodedPlace = 'Unable to geocode location';
  }

  dataTable.row.add([
    geocodedPerson.name.firstName,
    geocodedPerson.name.lastName,
    geocodedPerson.birthDate,
    geocodedPerson.birthPlace,
    geocodedPerson.relevance,
    geocodedPerson.geocodedPlace,
  ]);
  dataTable.draw();

  if (geocodedPerson.relevance < $('#relevanceRange').val()) {
    return createMarker(geocodedPerson, 'hidden');
  }
  return createMarker(geocodedPerson, 'visible');
}

function getIndividual(individual) {
  if (individual.tag === 'INDI') {
    const person = {
      name: getName(individual),
      birthPlace: getBirthInfo(individual).birthPlace,
      birthDate: processDate(getBirthInfo(individual).birthDate),
    };

    if (person.birthPlace === null) {
      dataTable.row.add([
        person.name.firstName,
        person.name.lastName,
        person.birthDate,
        'Missing birth place',
        '',
        '',
      ]);
      dataTable.draw();
    } else {
      geocodePerson(person)
        .then((geocodingResults) => {
          updateTableAndMarker(person, geocodingResults);
        })
        .catch((error) => {
          Error(error);
        });
    }
  }
}

export {
  updateMarkers,
  getIndividual,
  createMarker,
  geocodePerson,
  updateTableAndMarker,
};
