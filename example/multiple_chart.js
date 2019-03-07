import FusionExport from '../src/FusionExport';
import chartConfigs from './resource/chart_configs.json';

const chartExporter = new FusionExport();

chartExporter.exportChart({ chartConfig: chartConfigs });
