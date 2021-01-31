# Family Tree Map

https://www.alexandraulsh.com/family-tree-map/

Map the birthplaces of people in your family tree.

## About

[Ancestry](https://www.ancestry.com/), the most popular genealogy platform in the United States, lacks a feature that maps your entire family tree. To map your family tree, you could upload your tree to another service or geocode ancestor locations by hand. For privacy or data duplication reasons, you may not want to upload your family tree to another service, though. While both [Gramps](https://gramps-project.org/blog/) and [MacFamilyTree](https://www.syniumsoftware.com/macfamilytree) offer family tree maps, they require you to manually geocode and confirm each location before you can map it, a tedious and time-consuming process.

This project maps your family tree with only a GEDCOM file, the _de facto_ standard file format for family trees supported by most genealogy platforms and software. This saves you time (no more geocoding by hand) and frees you from needing to upload your family tree to an online genealogy platform.

## Getting started

1. Export your family tree as a GEDCOM file. Most genealogy software and online platforms, including [Ancestry](https://support.ancestry.com/s/article/Uploading-and-Downloading-Trees) and [MyHeritage](https://faq.myheritage.com/en/article/can-i-export-a-gedcom-file-of-my-family-tree-from-my-family-site), support exporting your family tree as a GEDCOM file. Your GEDCOM file must have the file extension `.ged` to work with Family Tree Map.
2. Visit https://www.alexandraulsh.com/family-tree-map/.
3. Click on _Choose File_ and find your exported GEDCOM file.
4. Find your exported GEDCOM file and click on _Open_.
5. Review your results.
   - The birthplaces of people in your family tree will be [geocoded](https://docs.mapbox.com/help/glossary/geocoding/) on the map on the left.
   - Click on any marker on the map to see the name, birth date, birthplace, geocoded birthplace, and [geocoding relevance](https://docs.mapbox.com/help/how-mapbox-works/geocoding/#result-prioritization-in-forward-geocoding) of a family tree member.
   * Use the table on the right to search for a specific person in your family tree. You can search by last name or country.
   * Any family tree members that can't be geocoded (e.g., missing birthplace) will show up in the table.
6. Optionally adjust the [geocoding relevance](https://docs.mapbox.com/help/how-mapbox-works/geocoding/#result-prioritization-in-forward-geocoding) to choose which results to show on the map. A higher score (0.75 and higher) is stricter and will show fewer results, while a lower score will show more results.

## Limitations

- This project does not save or store your GEDCOM file. If you refresh the page or close your tab, you will need to re-select your GEDCOM file.
- You can only map birth locations. You cannot map other events yet, like death location, marriage location, or residence.
- This project maps _all_ people in your GEDCOM file, not just direct ancestors.
- Most geocoding APIs are optimized for current place names, not historical place names. Results for older family tree members using historical place names will likely be less relevant.
- This project uses English as the default geocoding language, which reduces the relevance for other languages. For example, you may have less relevant results if your family tree uses French place names.
- The GEDCOM standard is paradoxically tolerant of ambiguity (e.g., place names and dates) but is strict about heteronormative relationships and gender identity. Tom Macwright, who wrote the [GEDCOM parser](https://github.com/tmcw/gedcom) this project uses, published [a great write up on this paradox](https://macwright.com/2021/01/18/gedcom.html).

## Privacy

GEDCOM files contain sensitive information like full names, birth dates, and birthplaces of living family members. You should be cautious and mindful of where you upload your GEDCOM files. Ideally, these genealogy services should protect the privacy of living people in your family tree.

Fortunately, this project does not require you to upload your GEDCOM file to an external server or service. Instead, your GEDCOM file is processed client-side in your browser using the [gedcom](https://github.com/tmcw/gedcom) parser. Your GEDCOM file is not stored in a database, and your family tree data does not persist across sessions. If you refresh the page, you will lose your map, and you will need to select your GEDCOM file again.

This project does send birthplaces in your GEDCOM file to the [Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/) for forward geocoding and placement on a [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/) map. This project does not send full names or birth years to the [Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/), only birthplaces.

## Alternatives

If you're interested in creating an accurate family tree map that you can save, I recommend either [Gramps](https://gramps-project.org/blog/) or purchasing [MacFamilyTree](https://www.syniumsoftware.com/macfamilytree). While both programs force you to manually geocode and confirm places before you can generate a map, this does improve your family tree map's accuracy. Both programs map multiple location event types and filter by year and other properties.

There are also a few free online services with mapping capabilities:

- [MyHeritage PedigreeMap™](https://blog.myheritage.com/2016/07/introducing-pedigreemap-an-interactive-map-of-your-family-history/) - This map is slow to load and slow to use, but displays points and heatmaps for multiple location events in your family tree. Instead of showing all points at once, you have to manually click on states, counties, or cities one at a time to add them.
- [Geni](https://www.geni.com/) - Geni lets you map current locations or birth locations from your family tree. The map plots a marker with no additional information, so you can't identify which marker is which person in your tree. Geni also requires your profile to be public and doesn't let you set the privacy of deceased relatives (either "Make this profile public" or "Let Geni decide"). Geni also has [restrictions on GEDCOM imports](https://www.geni.com/gedcom) to ensure compatibility with their World Family Tree.
- [Ancestry](https://www.ancestry.com/) - While you can't map your entire tree at once, Ancestry.com does have a couple of useful mapping features. Clicking on a person's profile will map all of the event locations for that person. If your AncestryDNA test has additional communities, then you can view ancestor birth locations within the regional outline for that community along a timeline.
- [FamilySearch](https://www.familysearch.org/blog/en/where-are-my-ancestors-from/) - FamilySearch has a Where Am I From? feature that maps family tree birth locations and lets you filter by generation, year, family lines, and country. Similar to Geni, FamilySearch is a collaborative genealogy site, and anybody can edit your tree. Also, any information you upload is owned or licensed by the Church of Latter-day Saints per their [terms of service](https://www.familysearch.org/legal/terms).

## Contributing

### Development

To run this project locally:

```sh
git clone git@github.com:alulsh/family-tree-map.git
cd family-tree-map
npm install
npm run dev
```

This will start a [Parcel development server](https://parceljs.org/cli.html#serve) in watch mode at http://localhost:1234.

### Dependencies

This project uses the following production dependencies:

- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/) for maps
- [Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/) for geocoding
- [gedcom](https://github.com/tmcw/gedcom) for parsing GEDCOM files
- [dayjs](https://day.js.org/) for parsing dates from GEDCOM files
- [jQuery DataTables](https://datatables.net/) for displaying processed family tree results
- [Assembly.css](https://labs.mapbox.com/assembly/) for CSS
- [Parcel](https://parceljs.org/) for bundling npm packages for the browser

### Tests

Run `npm test` to run tests.

This project uses [Jest](https://jestjs.io/) for tests with a [minimal Babel configuration](https://ryankubik.com/blog/parcel-and-jest) for compatibility with [Parcel](https://parceljs.org/). Since this project loads [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/) through the Mapbox CDN instead of bundling with Parcel, the Jest tests mock Mapbox GL JS using the [global object](https://jestjs.io/docs/en/configuration#globals-object) in the test [set up file](https://jestjs.io/docs/en/configuration#setupfiles-array).

This project uses [eslint](https://eslint.org/) with the [Airbnb JavaScript style guide](https://airbnb.io/javascript/) for code quality and [Prettier](https://prettier.io/) for code formatting.

If you're using [Visual Studio Code](https://code.visualstudio.com/), you can add the following to your `.vscode/settings.json` file for this project to enable automatic linting and formatting on save:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```
