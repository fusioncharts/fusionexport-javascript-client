import FusionExport from '../src/FusionExport';
import chartConfigs from './resource/chart_configs.json';

const chartExporter = new FusionExport();

chartExporter.exportDashboard({
  chartConfig: chartConfigs,
  templateFormat: 'A4',
  type: 'pdf',
});
