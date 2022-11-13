import { expect, test } from '@jest/globals';
import { defaultPerson, noName, noLastName, emptyLastName } from './fixtures';
import { getName, getBirthInfo, processDate } from '../family-tree';

test('Return first and last names of person', () => {
  expect(getName(defaultPerson)).toEqual({
    firstName: 'Jane Elizabeth',
    lastName: 'Doe',
  });
});

test('Graceful error handling for missing names', () => {
  expect(getName(noName)).toEqual({
    firstName: 'Missing first name',
    lastName: 'Missing last name',
  });
});

test('Graceful error handling for missing last name', () => {
  expect(getName(noLastName)).toEqual({
    firstName: 'Jane Elizabeth',
    lastName: 'Missing last name',
  });
});

test('Graceful error handling for empty last name', () => {
  expect(getName(emptyLastName)).toEqual({
    firstName: 'Alexandra',
    lastName: 'Missing last name',
  });
});

test('Return birth place and birth date of person', () => {
  expect(getBirthInfo(defaultPerson)).toEqual({
    birthPlace: 'Washington, D.C., USA',
    birthDate: '18 August 1926',
  });
});

test('Return full date', () => {
  expect(processDate('28 Sep 1780')).toBe('September 28, 1780');
});

test('Graceful error handling for missing or null dates', () => {
  expect(processDate('')).toBe('Invalid Date');
});

test('Return year for year only', () => {
  expect(processDate('1780')).toBe('1780');
});

test('Return full birth date if actually born on January 1st', () => {
  expect(processDate('1 January 1780')).toBe('January 1, 1780');
});

test('Remove word about from date strings', () => {
  expect(processDate('about 1590')).toBe('1590');
});

test('Remove word abt from date strings', () => {
  expect(processDate('abt 1590')).toBe('1590');
});
