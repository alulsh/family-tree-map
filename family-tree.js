import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(LocalizedFormat);
dayjs.extend(customParseFormat);

function getName(person) {
  let firstName = null;
  let lastName = null;

  person.tree.forEach((element) => {
    if (element.tag === 'NAME') {
      const name = element.data;

      if (name.length !== 0) {
        // Check for forward slash (/) for last name, if missing, just use the first name
        const forwardSlash = name.match('^(.*?)/');
        if (forwardSlash === null) {
          firstName = name;
          lastName = 'Missing last name';
        } else {
          // Check for present but empty last name - e.g. // in 'Alexandra //'
          const emptyLastName = name.match('^(.*?)//');
          if (emptyLastName) {
            firstName = forwardSlash[0].slice(0, -2);
            lastName = 'Missing last name';
          } else {
            firstName = forwardSlash[0].slice(0, -2);
            // match everything between forward slashes, then remove starting and trailing slashes
            lastName = name.match('/.+/')[0].slice(1, -1);
          }
        }
      } else {
        firstName = 'Missing first name';
        lastName = 'Missing last name';
      }
    }
  });

  return { firstName, lastName };
}

function getBirthInfo(person) {
  let birthPlace = null;
  let birthDate = null;

  person.tree.forEach((element) => {
    if (element.tag === 'BIRT') {
      element.tree.forEach((item) => {
        if (item.tag === 'PLAC') {
          birthPlace = item.data;
        }
        if (item.tag === 'DATE') {
          birthDate = item.data;
        }
      });
    }
  });

  return { birthPlace, birthDate };
}

function processDate(date) {
  const exactlyYear = dayjs(date, 'YYYY', true).isValid();
  const containsAbout = dayjs(date, '[about] YYYY', true).isValid();
  const containsAbt = dayjs(date, '[abt] YYYY', true).isValid();

  if (exactlyYear === true || containsAbout === true || containsAbt === true) {
    return dayjs(date).format('YYYY');
  }

  return dayjs(date).format('LL');
}

export { getName, getBirthInfo, processDate };
