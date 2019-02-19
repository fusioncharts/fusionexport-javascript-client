import sinon from 'sinon';
import { expect } from 'chai';
import TemplateBuilderService from '../../../src/services/dashboard/TemplateBuilderService';

describe('TemplateBuilderService', () => {
  it('should parse template correctly', () => {
    const opts = {
      formdata: {
        template: '<div class="container"><h1>This is a header</h1></div>',
      },
    };
    const tbs = new TemplateBuilderService(opts);
    tbs.build();
    const h1Tag = tbs.dom.body.querySelector('.container > h1');
    expect(h1Tag.innerText).to.equal('This is a header');
  });

  it('should enclose elements in required html tags', () => {
    const opts = {
      formdata: {
        template: '<div class="container"></div>',
      },
    };
    const tbs = new TemplateBuilderService(opts);
    const processedOpts = tbs.build();
    expect(processedOpts.formdata.template).to.equal('<html><head></head><body><div class="container"></div></body></html>');
  });

  it('should use default template when only chartConfig is passed', () => {
    const opts = {
      formdata: {
        chartConfig: JSON.stringify([{ type: 'column2d' }]),
      },
    };
    const tbs = new TemplateBuilderService(opts);
    const processedOpts = tbs.build();
    expect(processedOpts.formdata.template).to.include('<div id="chart-container-0"></div>');
  });

  it('should generate chart containers according to chartConfig', () => {
    const opts = {
      formdata: {
        chartConfig: JSON.stringify([{ type: 'column2d' }, { type: 'column2d' }, { type: 'column2d' }]),
      },
    };
    const tbs = new TemplateBuilderService(opts);
    tbs.build();
    const containerDivs = tbs.dom.body.querySelector('div.chart-wrapper').childNodes;
    expect(containerDivs.length).to.equal(JSON.parse(opts.formdata.chartConfig).length);
  });

  it('should generate chart containers ids according to chartConfig', () => {
    const opts = {
      formdata: {
        chartConfig: JSON.stringify([{ type: 'column2d' }, { type: 'column2d' }, { type: 'column2d' }]),
      },
    };
    const tbs = new TemplateBuilderService(opts);
    const processedOpts = tbs.build();
    const containerDivs = tbs.dom.body.querySelector('div.chart-wrapper').childNodes;
    const containerIds = Array.from(containerDivs).map(div => div.getAttribute('id'));
    const generatedIds = JSON.parse(processedOpts.formdata.chartConfig)
      .map(config => config.renderAt);
    expect(containerIds).to.deep.equal(generatedIds);
  });

  it('should generate chart containers with div', () => {
    const opts = {
      formdata: {
        chartConfig: JSON.stringify([{ type: 'column2d' }, { type: 'column2d' }, { type: 'column2d' }]),
      },
    };
    const tbs = new TemplateBuilderService(opts);
    tbs.build();
    const containerDivs = tbs.dom.body.querySelector('div.chart-wrapper').childNodes;
    const containerTagNames = Array.from(containerDivs).map(div => div.tagName);
    expect(containerTagNames).to.deep.equal(['DIV', 'DIV', 'DIV']);
  });

  it('should serialize the chartConfig after building', () => {
    const opts = {
      formdata: {
        chartConfig: JSON.stringify([{ type: 'column2d' }]),
      },
    };
    const tbs = new TemplateBuilderService(opts);
    const processedOpts = tbs.build();
    expect(processedOpts.formdata.chartConfig).to.be.a('string');
  });

  it('should insert link tags as defined', () => {
    const opts = {
      formdata: {
        template: '<h1>Hi!</h1>',
      },
      metadata: {
        resources: {
          links: [
            { href: 'https://exmaple.com/style.css', rel: 'stylesheet' },
          ],
        },
      },
    };
    const tbs = new TemplateBuilderService(opts);
    tbs.build();
    const linkTags = tbs.dom.head.querySelectorAll('link');
    const [insertedLinkTag] = Array.from(linkTags).filter(link => link.href === 'https://exmaple.com/style.css');
    expect(insertedLinkTag).to.not.equal(undefined);
    expect(insertedLinkTag.getAttribute('rel')).to.equal('stylesheet');
  });

  it('should warn before ignoring link tags with no href attribute', () => {
    sinon.stub(console, 'warn');
    const opts = {
      formdata: {
        template: '<h1>Hi!</h1>',
      },
      metadata: {
        resources: {
          links: [
            { rel: 'stylesheet' },
          ],
        },
      },
    };
    const tbs = new TemplateBuilderService(opts);
    tbs.build();
    const linkTags = tbs.dom.head.querySelectorAll('link');
    expect(linkTags.length).to.equal(0);
    expect(console.warn.calledWithMatch('Ignoring link')).to.equal(true);
    console.warn.restore();
  });

  it('should insert script tags as defined', () => {
    const opts = {
      formdata: {
        template: '<h1>Hi!</h1>',
      },
      metadata: {
        resources: {
          scripts: [
            { src: 'https://exmaple.com/script.js', type: 'text/javascript' },
          ],
        },
      },
    };
    const tbs = new TemplateBuilderService(opts);
    tbs.build();
    const scriptTags = tbs.dom.body.querySelectorAll('script');
    const [insertedScriptTag] = Array.from(scriptTags).filter(script => script.src === 'https://exmaple.com/script.js');
    expect(insertedScriptTag).to.not.equal(undefined);
    expect(insertedScriptTag.getAttribute('type')).to.equal('text/javascript');
  });

  it('should warn before ignoring link tags with no href attribute', () => {
    sinon.stub(console, 'warn');
    const opts = {
      formdata: {
        template: '<h1>Hi!</h1>',
      },
      metadata: {
        resources: {
          scripts: [
            { type: 'text/javascript' },
          ],
        },
      },
    };
    const tbs = new TemplateBuilderService(opts);
    tbs.build();
    const scriptTags = tbs.dom.body.querySelectorAll('script');
    expect(scriptTags.length).to.equal(0);
    expect(console.warn.calledWithMatch('Ignoring script')).to.equal(true);
    console.warn.restore();
  });

  it('should insert templateOnLoad function in script tag', () => {
    const opts = {
      formdata: {
        template: '<h1>Hi!</h1>',
      },
      metadata: {
        templateOnLoad: () => { console.log('Hi!'); },
      },
    };
    const tbs = new TemplateBuilderService(opts);
    tbs.build();
    const [scriptTag] = tbs.dom.body.querySelectorAll('script');
    expect(scriptTag.innerText).to.equal(`window.onload = ${opts.metadata.templateOnLoad.toString()}`);
  });
});
