export default class FusionExport {
  constructor(config) {
    const defaultConfig = {
      host: '127.0.0.1',
      port: 1337,
    };

    this.serverConfig = Object.assign({}, defaultConfig, config);
  }
}
