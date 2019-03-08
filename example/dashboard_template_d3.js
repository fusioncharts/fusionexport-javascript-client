/* global d3 */
/* eslint-disable no-param-reassign */

import FusionExport from '../src/FusionExport';
import template from './resource/template_d3.html';

const chartExporter = new FusionExport();

function renderChart() {
  const margin = {
    top: 30, right: 20, bottom: 30, left: 50,
  };

  const width = 600 - margin.left - margin.right;
  const height = 270 - margin.top - margin.bottom;
  const parseDate = d3.time.format('%d-%b-%y').parse;

  const x = d3.time.scale().range([0, width]);
  const y = d3.scale.linear().range([height, 0]);

  const xAxis = d3.svg.axis().scale(x)
    .orient('bottom').ticks(5);

  const yAxis = d3.svg.axis().scale(y)
    .orient('left').ticks(5);

  const valueline = d3.svg.line()
    .x(d => x(d.date))
    .y(d => y(d.close));

  const svg = d3.select('body')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const data = JSON.parse('[{"date":"1-May-12","close":"58.13"},{"date":"30-Apr-12","close":"53.98"},{"date":"27-Apr-12","close":"67.00"},{"date":"26-Apr-12","close":"89.70"},{"date":"25-Apr-12","close":"99.00"},{"date":"24-Apr-12","close":"130.28"},{"date":"23-Apr-12","close":"166.70"},{"date":"20-Apr-12","close":"234.98"},{"date":"19-Apr-12","close":"345.44"},{"date":"18-Apr-12","close":"443.34"},{"date":"17-Apr-12","close":"543.70"},{"date":"16-Apr-12","close":"580.13"},{"date":"13-Apr-12","close":"605.23"},{"date":"12-Apr-12","close":"622.77"},{"date":"11-Apr-12","close":"626.20"},{"date":"10-Apr-12","close":"628.44"},{"date":"9-Apr-12","close":"636.23"},{"date":"5-Apr-12","close":"633.68"},{"date":"4-Apr-12","close":"624.31"},{"date":"3-Apr-12","close":"629.32"},{"date":"2-Apr-12","close":"618.63"},{"date":"30-Mar-12","close":"599.55"},{"date":"29-Mar-12","close":"609.86"},{"date":"28-Mar-12","close":"617.62"},{"date":"27-Mar-12","close":"614.48"},{"date":"26-Mar-12","close":"606.98"}]');

  data.forEach((d) => {
    d.date = parseDate(d.date);
    d.close = +d.close;
  });

  x.domain(d3.extent(data, d => d.date));
  y.domain([0, d3.max(data, d => d.close)]);

  svg.append('path')
    .attr('class', 'line')
    .attr('d', valueline(data));

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0,${height})`)
    .call(xAxis);

  svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

  FusionExport.emit('CAPTURE_EXIT');
}

chartExporter.exportDashboard({
  template,
  templateOnLoad: renderChart,
  resources: {
    scripts: [
      { src: 'http://d3js.org/d3.v3.min.js' },
    ],
    links: [
      { href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,600', type: 'text/css', rel: 'stylesheet' },
    ],
  },
  asyncCapture: true,
  type: 'pdf',
});
