import { afterEach, expect, test, jest } from '@jest/globals';
import $ from 'jquery';
import { readFileSync } from 'fs';
import { updateRelevance, readGedcomFile } from '../window-functions';
import * as geocode from '../geocode';
import { sampleGedcomParsed } from './fixtures';

afterEach(() => {
  jest.clearAllMocks();
});

const emptyTextFile = new File(['empty'], 'empty.txt', {
  type: 'text/plain',
});
const emptyEvent = {
  target: {
    files: [emptyTextFile],
  },
};

const sampleGedcom = readFileSync('./test/555SAMPLE.GED', 'utf8');
const sampleGedcomFile = new File([sampleGedcom], '555SAMPLE.GED', {
  type: 'text/plain',
});
const gedcomEvent = {
  target: {
    files: [sampleGedcomFile],
  },
};

test('updateRelevance function updates #relevanceOutput', () => {
  document.body.innerHTML =
    '<input type="range" name="relevance" min="0" max="1" value="0.75" step="0.05" id="relevanceRange" oninput="updateRelevance(value)"/>' +
    '<output for="relevance" id="relevanceOutput">0.75</output>';
  updateRelevance('0.5');
  expect.assertions(1);
  expect($('#relevanceOutput').val()).toBe('0.5');
});

test('updateRelevance function calls updateMarkers function', () => {
  const spy = jest.spyOn(geocode, 'updateMarkers');
  document.body.innerHTML =
    '<input type="range" name="relevance" min="0" max="1" value="0.75" step="0.05" id="relevanceRange" oninput="updateRelevance(value)"/>' +
    '<output for="relevance" id="relevanceOutput">0.75</output>';
  updateRelevance('1');
  expect.assertions(1);
  expect(spy).toBeCalled();
});

test('Parse valid GEDCOM file', () => {
  return readGedcomFile(gedcomEvent).then((data) => {
    expect.assertions(1);
    expect(data).toEqual(sampleGedcomParsed);
  });
});

test('Error handling for empty GEDCOM file', () => {
  return readGedcomFile(emptyEvent).catch((error) => {
    expect.assertions(1);
    expect(error).toEqual(Error('Empty GEDCOM file'));
  });
});

test.skip('Throw error for invalid GEDCOM file', () => {
  return readGedcomFile(emptyEvent).catch((error) => {
    expect.assertions(1);
    expect(error).toEqual(Error('Failed to load file'));
  });
});
