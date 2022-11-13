const geocodingApiMock = {
  type: 'FeatureCollection',
  query: ['harrisburg', 'pennsylvania', 'usa'],
  features: [
    {
      id: 'place.1518339533931500',
      type: 'Feature',
      place_type: ['place'],
      relevance: 1,
      properties: {
        wikidata: 'Q25280',
      },
      text: 'Harrisburg',
      place_name: 'Harrisburg, Pennsylvania, United States',
      matching_place_name: 'Harrisburg, Pennsylvania, USA',
      bbox: [
        -76.9321490100661,
        40.2005689861733,
        -76.6596440514521,
        40.4747183577801,
      ],
      center: [-76.8861, 40.2663],
      geometry: {
        type: 'Point',
        coordinates: [-76.8861, 40.2663],
      },
      context: [
        {
          id: 'region.13761801799111630',
          wikidata: 'Q1400',
          short_code: 'US-PA',
          text: 'Pennsylvania',
        },
        {
          id: 'country.19678805456372290',
          wikidata: 'Q30',
          short_code: 'us',
          text: 'United States',
        },
      ],
    },
  ],
  attribution:
    'NOTICE: © 2021 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare.',
};

const defaultPerson = {
  pointer: '@P1@',
  tag: 'INDI',
  data: '',
  tree: [
    {
      pointer: '',
      tag: 'BIRT',
      data: '',
      tree: [
        { pointer: '', tag: 'DATE', data: '18 August 1926', tree: [] },
        {
          pointer: '',
          tag: 'PLAC',
          data: 'Washington, D.C., USA',
          tree: [],
        },
      ],
    },
    { pointer: '', tag: 'NAME', data: 'Jane Elizabeth /Doe/', tree: [] },
    { pointer: '', tag: 'SEX', data: 'F', tree: [] },
    {
      pointer: '',
      tag: 'OBJE',
      data: '',
      tree: [
        {
          pointer: '',
          tag: 'FILE',
          data:
            'http://trees.ancestry.com/rd?f=image&guid=fakeguid&tid=fake&pid=fake',
          tree: [],
        },
        { pointer: '', tag: 'FORM', data: 'jpg', tree: [] },
        { pointer: '', tag: 'TITL', data: 'Headshot', tree: [] },
      ],
    },
    { pointer: '', tag: 'FAMC', data: '@F1@', tree: [] },
  ],
};

const noName = {
  pointer: '@P1@',
  tag: 'INDI',
  data: '',
  tree: [
    {
      pointer: '',
      tag: 'BIRT',
      data: '',
      tree: [
        { pointer: '', tag: 'DATE', data: '18 August 1926', tree: [] },
        {
          pointer: '',
          tag: 'PLAC',
          data: 'Washington, D.C., USA',
          tree: [],
        },
      ],
    },
    { pointer: '', tag: 'NAME', data: '', tree: [] },
    { pointer: '', tag: 'SEX', data: 'F', tree: [] },
    {
      pointer: '',
      tag: 'OBJE',
      data: '',
      tree: [
        {
          pointer: '',
          tag: 'FILE',
          data:
            'http://trees.ancestry.com/rd?f=image&guid=fakeguid&tid=fake&pid=fake',
          tree: [],
        },
        { pointer: '', tag: 'FORM', data: 'jpg', tree: [] },
        { pointer: '', tag: 'TITL', data: 'Headshot', tree: [] },
      ],
    },
    { pointer: '', tag: 'FAMC', data: '@F1@', tree: [] },
  ],
};

const noLastName = {
  pointer: '@P1@',
  tag: 'INDI',
  data: '',
  tree: [
    {
      pointer: '',
      tag: 'BIRT',
      data: '',
      tree: [
        { pointer: '', tag: 'DATE', data: '18 August 1926', tree: [] },
        {
          pointer: '',
          tag: 'PLAC',
          data: 'Washington, D.C., USA',
          tree: [],
        },
      ],
    },
    { pointer: '', tag: 'NAME', data: 'Jane Elizabeth', tree: [] },
    { pointer: '', tag: 'SEX', data: 'F', tree: [] },
    {
      pointer: '',
      tag: 'OBJE',
      data: '',
      tree: [
        {
          pointer: '',
          tag: 'FILE',
          data:
            'http://trees.ancestry.com/rd?f=image&guid=fakeguid&tid=fake&pid=fake',
          tree: [],
        },
        { pointer: '', tag: 'FORM', data: 'jpg', tree: [] },
        { pointer: '', tag: 'TITL', data: 'Headshot', tree: [] },
      ],
    },
    { pointer: '', tag: 'FAMC', data: '@F1@', tree: [] },
  ],
};

const emptyLastName = {
  pointer: '@123456789@',
  tag: 'INDI',
  data: '',
  tree: [
    {
      pointer: '',
      tag: 'NAME',
      data: 'Alexandra //',
      tree: [
        {
          pointer: '',
          tag: 'GIVN',
          data: 'Alexandra',
          tree: [],
        },
      ],
    },
    {
      pointer: '',
      tag: 'SEX',
      data: 'F',
      tree: [],
    },
    {
      pointer: '',
      tag: 'CHAN',
      data: '',
      tree: [
        {
          pointer: '',
          tag: 'DATE',
          data: '03 NOV 2019',
          tree: [
            {
              pointer: '',
              tag: 'TIME',
              data: '10:58:27',
              tree: [],
            },
          ],
        },
      ],
    },
    {
      pointer: '',
      tag: '_CRE',
      data: '',
      tree: [
        {
          pointer: '',
          tag: 'DATE',
          data: '03 NOV 2019',
          tree: [
            {
              pointer: '',
              tag: 'TIME',
              data: '10:57:32',
              tree: [],
            },
          ],
        },
      ],
    },
  ],
};

const sampleGedcomParsed = [
  {
    pointer: '',
    tag: 'HEAD',
    data: '',
    tree: [
      {
        pointer: '',
        tag: 'GEDC',
        data: '',
        tree: [
          {
            pointer: '',
            tag: 'VERS',
            data: '5.5.5',
            tree: [],
          },
          {
            pointer: '',
            tag: 'FORM',
            data: 'LINEAGE-LINKED',
            tree: [
              {
                pointer: '',
                tag: 'VERS',
                data: '5.5.5',
                tree: [],
              },
            ],
          },
        ],
      },
      {
        pointer: '',
        tag: 'CHAR',
        data: 'UTF-8',
        tree: [],
      },
      {
        pointer: '',
        tag: 'SOUR',
        data: 'GS',
        tree: [
          {
            pointer: '',
            tag: 'NAME',
            data: 'GEDCOM Specification',
            tree: [],
          },
          {
            pointer: '',
            tag: 'VERS',
            data: '5.5.5',
            tree: [],
          },
          {
            pointer: '',
            tag: 'CORP',
            data: 'gedcom.org',
            tree: [
              {
                pointer: '',
                tag: 'ADDR',
                data: '',
                tree: [
                  {
                    pointer: '',
                    tag: 'CITY',
                    data: 'LEIDEN',
                    tree: [],
                  },
                ],
              },
              {
                pointer: '',
                tag: 'WWW',
                data: 'www.gedcom.org',
                tree: [],
              },
            ],
          },
        ],
      },
      {
        pointer: '',
        tag: 'DATE',
        data: '2 Oct 2019',
        tree: [
          {
            pointer: '',
            tag: 'TIME',
            data: '0:00:00',
            tree: [],
          },
        ],
      },
      {
        pointer: '',
        tag: 'FILE',
        data: '555Sample.ged',
        tree: [],
      },
      {
        pointer: '',
        tag: 'LANG',
        data: 'English',
        tree: [],
      },
      {
        pointer: '',
        tag: 'SUBM',
        data: '@U1@',
        tree: [],
      },
    ],
  },
  {
    pointer: '@U1@',
    tag: 'SUBM',
    data: '',
    tree: [
      {
        pointer: '',
        tag: 'NAME',
        data: 'Reldon Poulson',
        tree: [],
      },
      {
        pointer: '',
        tag: 'ADDR',
        data: '',
        tree: [
          {
            pointer: '',
            tag: 'ADR1',
            data: '1900 43rd Street West',
            tree: [],
          },
          {
            pointer: '',
            tag: 'CITY',
            data: 'Billings',
            tree: [],
          },
          {
            pointer: '',
            tag: 'STAE',
            data: 'Montana',
            tree: [],
          },
          {
            pointer: '',
            tag: 'POST',
            data: '68051',
            tree: [],
          },
          {
            pointer: '',
            tag: 'CTRY',
            data: 'United States of America',
            tree: [],
          },
        ],
      },
      {
        pointer: '',
        tag: 'PHON',
        data: '+1 (406) 555-1232',
        tree: [],
      },
    ],
  },
  {
    pointer: '@I1@',
    tag: 'INDI',
    data: '',
    tree: [
      {
        pointer: '',
        tag: 'NAME',
        data: 'Robert Eugene /Williams/',
        tree: [
          {
            pointer: '',
            tag: 'SURN',
            data: 'Williams',
            tree: [],
          },
          {
            pointer: '',
            tag: 'GIVN',
            data: 'Robert Eugene',
            tree: [],
          },
        ],
      },
      {
        pointer: '',
        tag: 'SEX',
        data: 'M',
        tree: [],
      },
      {
        pointer: '',
        tag: 'BIRT',
        data: '',
        tree: [
          {
            pointer: '',
            tag: 'DATE',
            data: '2 Oct 1822',
            tree: [],
          },
          {
            pointer: '',
            tag: 'PLAC',
            data: 'Weston, Madison, Connecticut, United States of America',
            tree: [],
          },
          {
            pointer: '',
            tag: 'SOUR',
            data: '@S1@',
            tree: [
              {
                pointer: '',
                tag: 'PAGE',
                data: 'Sec. 2, p. 45',
                tree: [],
              },
            ],
          },
        ],
      },
      {
        pointer: '',
        tag: 'DEAT',
        data: '',
        tree: [
          {
            pointer: '',
            tag: 'DATE',
            data: '14 Apr 1905',
            tree: [],
          },
          {
            pointer: '',
            tag: 'PLAC',
            data: 'Stamford, Fairfield, Connecticut, United States of America',
            tree: [],
          },
        ],
      },
      {
        pointer: '',
        tag: 'BURI',
        data: '',
        tree: [
          {
            pointer: '',
            tag: 'PLAC',
            data:
              'Spring Hill Cemetery, Stamford, Fairfield, Connecticut, United States of America',
            tree: [],
          },
        ],
      },
      {
        pointer: '',
        tag: 'FAMS',
        data: '@F1@',
        tree: [],
      },
      {
        pointer: '',
        tag: 'FAMS',
        data: '@F2@',
        tree: [],
      },
      {
        pointer: '',
        tag: 'RESI',
        data: '',
        tree: [
          {
            pointer: '',
            tag: 'DATE',
            data: 'from 1900 to 1905',
            tree: [],
          },
        ],
      },
    ],
  },
  {
    pointer: '@I2@',
    tag: 'INDI',
    data: '',
    tree: [
      {
        pointer: '',
        tag: 'NAME',
        data: 'Mary Ann /Wilson/',
        tree: [
          {
            pointer: '',
            tag: 'SURN',
            data: 'Wilson',
            tree: [],
          },
          {
            pointer: '',
            tag: 'GIVN',
            data: 'Mary Ann',
            tree: [],
          },
        ],
      },
      {
        pointer: '',
        tag: 'SEX',
        data: 'F',
        tree: [],
      },
      {
        pointer: '',
        tag: 'BIRT',
        data: '',
        tree: [
          {
            pointer: '',
            tag: 'DATE',
            data: 'BEF 1828',
            tree: [],
          },
          {
            pointer: '',
            tag: 'PLAC',
            data: 'Connecticut, United States of America',
            tree: [],
          },
        ],
      },
      {
        pointer: '',
        tag: 'FAMS',
        data: '@F1@',
        tree: [],
      },
    ],
  },
  {
    pointer: '@I3@',
    tag: 'INDI',
    data: '',
    tree: [
      {
        pointer: '',
        tag: 'NAME',
        data: 'Joe /Williams/',
        tree: [
          {
            pointer: '',
            tag: 'SURN',
            data: 'Williams',
            tree: [],
          },
          {
            pointer: '',
            tag: 'GIVN',
            data: 'Joe',
            tree: [],
          },
        ],
      },
      {
        pointer: '',
        tag: 'SEX',
        data: 'M',
        tree: [],
      },
      {
        pointer: '',
        tag: 'BIRT',
        data: '',
        tree: [
          {
            pointer: '',
            tag: 'DATE',
            data: '11 Jun 1861',
            tree: [],
          },
          {
            pointer: '',
            tag: 'PLAC',
            data: 'Idaho Falls, Bonneville, Idaho, United States of America',
            tree: [],
          },
        ],
      },
      {
        pointer: '',
        tag: 'FAMC',
        data: '@F1@',
        tree: [],
      },
      {
        pointer: '',
        tag: 'FAMC',
        data: '@F2@',
        tree: [
          {
            pointer: '',
            tag: 'PEDI',
            data: 'adopted',
            tree: [],
          },
        ],
      },
      {
        pointer: '',
        tag: 'ADOP',
        data: '',
        tree: [
          {
            pointer: '',
            tag: 'DATE',
            data: '16 Mar 1864',
            tree: [],
          },
        ],
      },
    ],
  },
  {
    pointer: '@F1@',
    tag: 'FAM',
    data: '',
    tree: [
      {
        pointer: '',
        tag: 'HUSB',
        data: '@I1@',
        tree: [],
      },
      {
        pointer: '',
        tag: 'WIFE',
        data: '@I2@',
        tree: [],
      },
      {
        pointer: '',
        tag: 'CHIL',
        data: '@I3@',
        tree: [],
      },
      {
        pointer: '',
        tag: 'MARR',
        data: '',
        tree: [
          {
            pointer: '',
            tag: 'DATE',
            data: 'Dec 1859',
            tree: [],
          },
          {
            pointer: '',
            tag: 'PLAC',
            data:
              'Rapid City, Pennington, South Dakota, United States of America',
            tree: [],
          },
        ],
      },
    ],
  },
  {
    pointer: '@F2@',
    tag: 'FAM',
    data: '',
    tree: [
      {
        pointer: '',
        tag: 'HUSB',
        data: '@I1@',
        tree: [],
      },
      {
        pointer: '',
        tag: 'CHIL',
        data: '@I3@',
        tree: [],
      },
    ],
  },
  {
    pointer: '@S1@',
    tag: 'SOUR',
    data: '',
    tree: [
      {
        pointer: '',
        tag: 'DATA',
        data: '',
        tree: [
          {
            pointer: '',
            tag: 'EVEN',
            data: 'BIRT, DEAT, MARR',
            tree: [
              {
                pointer: '',
                tag: 'DATE',
                data: 'FROM Jan 1820 TO DEC 1825',
                tree: [],
              },
              {
                pointer: '',
                tag: 'PLAC',
                data: 'Madison, Connecticut, United States of America',
                tree: [],
              },
            ],
          },
          {
            pointer: '',
            tag: 'AGNC',
            data: 'Madison County Court',
            tree: [],
          },
        ],
      },
      {
        pointer: '',
        tag: 'TITL',
        data: 'Madison County Birth, Death, and Marriage Records',
        tree: [],
      },
      {
        pointer: '',
        tag: 'ABBR',
        data: 'Madison BMD Records',
        tree: [],
      },
      {
        pointer: '',
        tag: 'REPO',
        data: '@R1@',
        tree: [
          {
            pointer: '',
            tag: 'CALN',
            data: '13B-1234.01',
            tree: [],
          },
        ],
      },
    ],
  },
  {
    pointer: '@R1@',
    tag: 'REPO',
    data: '',
    tree: [
      {
        pointer: '',
        tag: 'NAME',
        data: 'Family History Library',
        tree: [],
      },
      {
        pointer: '',
        tag: 'ADDR',
        data: '',
        tree: [
          {
            pointer: '',
            tag: 'ADR1',
            data: '35 N West Temple Street',
            tree: [],
          },
          {
            pointer: '',
            tag: 'CITY',
            data: 'Salt Lake City',
            tree: [],
          },
          {
            pointer: '',
            tag: 'STAE',
            data: 'Utah',
            tree: [],
          },
          {
            pointer: '',
            tag: 'POST',
            data: '84150',
            tree: [],
          },
          {
            pointer: '',
            tag: 'CTRY',
            data: 'United States of America',
            tree: [],
          },
        ],
      },
    ],
  },
  {
    pointer: '',
    tag: 'TRLR',
    data: '',
    tree: [],
  },
];

export {
  defaultPerson,
  noName,
  noLastName,
  emptyLastName,
  sampleGedcomParsed,
  geocodingApiMock,
};
