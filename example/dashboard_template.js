import FusionExport from '../src/FusionExport';
import chartConfigs from './resource/template_chart_configs.json';
import template from './resource/template.html';

const chartExporter = new FusionExport();

chartExporter.exportDashboard({
  chartConfig: chartConfigs,
  template,
});
