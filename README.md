# FusionExport Javascript Client

Javascript SDK for FusionExport. Enables exporting from browser using FusionExport.

## Installation
To install the module, simply use npm:

```bash
$ npm install --save fusionexport-javascript-client
```

## Usage

To require the SDK into your project:

```js
const FusionExport = require('fusionexport-javascript-client');
```

## Getting Started

Start with a simple chart export. For exporting a single chart just pass the chart configuration as you would have passed it to the FusionCharts constructor.

```js
// Require FusionExport
const FusionExport = require('fusionexport-javascript-client');

const chartConfig = {
  type: 'column2d',
  dataFormat: 'json',
  dataSource: {
    chart: {
      caption: 'Number of visitors last week',
      theme: 'ocean',
      subCaption: 'Bakersfield Central vs Los Angeles Topanga',
    },
    data: [
      {
        label: 'Mon',
        value: '15123',
      },
      {
        label: 'Tue',
        value: '14233',
      },
      {
        label: 'Wed',
        value: '25507',
      },
    ],
  },
};

// Instantiate FusionExport exporter
const exporter = new FusionExport({
    host: 'api.fusionexport.com',
    port: 1337,
});

// Call the function to automatically download the exported file
exporter.exportChart({
    chartConfig,
});
```

## API Reference

There is a lot more in this library. You can find the full reference [here](https://www.fusioncharts.com/dev/exporting-charts/using-fusionexport/sdk-api-reference/javascript.html).