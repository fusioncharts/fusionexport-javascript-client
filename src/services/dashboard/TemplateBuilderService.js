export default class TemplateBuilderService {
  constructor(processedOptions) {
    this.processedOptions = { ...{ formdata: {}, metadata: {} }, ...processedOptions };
    this.defaults = {
      template: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title></title><style>html,body{margin:0;padding:0;min-width:800px}.chart-wrapper{display:flex;flex-flow:row wrap;}</style></head><body></body></html>',
    };
  }

  parseTemplate() {
    const domParser = new DOMParser();
    const template = this.processedOptions.formdata.template;

    if (template) {
      this.dom = domParser.parseFromString(template, 'text/html');
      return;
    }

    this.dom = domParser.parseFromString(this.defaults.template, 'text/html');

    let chartConfigList = JSON.parse(this.processedOptions.formdata.chartConfig);
    const chartWrapper = document.createElement('div');
    chartWrapper.classList.add('chart-wrapper');

    chartConfigList = chartConfigList.map((config, idx) => {
      const renderAt = `chart-container-${idx}`;
      const chartContainer = document.createElement('div');
      chartContainer.setAttribute('id', renderAt);
      chartWrapper.appendChild(chartContainer);
      return {
        ...config,
        renderAt,
      };
    });

    this.processedOptions.formdata.chartConfig = JSON.stringify(chartConfigList);
    this.dom.body.appendChild(chartWrapper);
  }

  addLinks() {
    const resources = this.processedOptions.metadata.resources;
    if (!resources) return;

    const links = resources.links;
    if (!links) return;

    links.forEach((link) => {
      if (!link) return;

      if (!link.href) {
        console.warn(`href key for link not found. Ignoring link: ${JSON.stringify(link)}`);
        return;
      }

      const linkTag = document.createElement('link');

      Object.keys(link).forEach((key) => {
        const val = link[key];
        linkTag.setAttribute(key, val);
      });

      this.dom.head.appendChild(linkTag);
    });
  }

  addScripts() {
    const resources = this.processedOptions.metadata.resources;
    if (!resources) return;

    const scripts = resources.scripts;
    if (!scripts) return;

    scripts.forEach((script) => {
      if (!script) return;

      if (!script.src) {
        console.warn(`src key for script not found. Ignoring script: ${JSON.stringify(script)}`);
        return;
      }

      const scriptTag = document.createElement('script');

      Object.keys(script).forEach((key) => {
        const val = script[key];
        scriptTag.setAttribute(key, val);
      });

      this.dom.body.appendChild(scriptTag);
    });
  }

  addOnLoadCallback() {
    const onLoadCallback = this.processedOptions.metadata.templateOnLoad;

    if (!onLoadCallback) return;

    const scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.text = `window.onload = ${onLoadCallback.toString()}`;

    this.dom.body.appendChild(scriptTag);
  }

  serializeDOM() {
    this.processedOptions.formdata.template = this.dom.documentElement.outerHTML;
  }

  build() {
    this.parseTemplate();

    this.addLinks();
    this.addScripts();
    this.addOnLoadCallback();

    this.serializeDOM();

    return this.processedOptions;
  }
}
