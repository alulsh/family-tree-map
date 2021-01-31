import $ from 'jquery';
import parseGedcom from 'parse-gedcom';
import { updateMarkers, getIndividual } from './geocode';

function updateRelevance(value) {
  $('#relevanceOutput').val(value);
  updateMarkers();
}

function readGedcomFile(file) {
  return new Promise((resolve, reject) => {
    const gedcomFile = file.target.files[0];
    const reader = new FileReader();

    reader.readAsText(gedcomFile);

    reader.onload = function loadGedcom(event) {
      $('#results').css('visibility', 'visible');
      const gedcomJSON = parseGedcom.parse(event.target.result);
      if ($.isEmptyObject(gedcomJSON)) {
        reject(new Error('Empty GEDCOM file'));
      }
      // Limit people in family tree for testing
      // const startingNumber = 1;
      // const endingNumber = 10;
      // for (let i = startingNumber; i < endingNumber; i += 1) {
      //   getIndividual(gedcomJSON[i]);
      // }
      gedcomJSON.forEach((individual) => {
        getIndividual(individual);
      });
      resolve(gedcomJSON);
    };

    reader.onerror = function gedcomError() {
      reject(new Error('Failed to load file'));
    };
  });
}

function showTooltip(event) {
  const tooltip = $('#tooltip');
  tooltip.css({
    display: 'block',
    left: `${event.pageX + 10}px`,
    top: `${event.pageY + 10}px`,
  });
}

function hideTooltip() {
  const tooltip = $('#tooltip');
  tooltip.css('display', 'none');
}

// https://stackoverflow.com/a/57603027
window.updateRelevance = updateRelevance;
window.readGedcomFile = readGedcomFile;
window.showTooltip = showTooltip;
window.hideTooltip = hideTooltip;

export { updateRelevance, readGedcomFile };
