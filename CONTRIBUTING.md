# Contributing

## Development

To run this project locally:

```sh
git clone git@github.com:alulsh/family-tree-map.git
cd family-tree-map
npm install
npm run dev
```

This will start a [Parcel development server](https://parceljs.org/cli.html#serve) in watch mode at http://localhost:1234.

## Dependencies

This project uses the following production dependencies:

- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/) for maps
- [Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/) for geocoding
- [gedcom](https://github.com/tmcw/gedcom) for parsing GEDCOM files
- [dayjs](https://day.js.org/) for parsing dates from GEDCOM files
- [jQuery DataTables](https://datatables.net/) for displaying processed family tree results
- [Assembly.css](https://labs.mapbox.com/assembly/) for CSS
- [Parcel](https://parceljs.org/) for bundling npm packages for the browser

## Tests

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

## Deployment

This project is hosted on GitHub Pages using the `gh-pages` branch. Parcel bundles all files to a local `dist` directory, which we push to the `gh-pages` branch. You can view the deployment at https://www.alexandraulsh.com/family-tree-map/.

To deploy updates to GitHub Pages:

```sh
npm run build
npm run deploy
```
