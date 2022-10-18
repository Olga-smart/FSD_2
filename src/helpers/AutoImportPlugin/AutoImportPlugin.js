const fs = require('fs');
const path = require('path');

class AutoImportPlugin {
  constructor(options) {
    this.pages = options.pages;
    this.components = options.components;
    this.folders = fs.readdirSync(options.pages, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .filter((dirent) => fs.existsSync(path.resolve(options.pages, `${dirent.name}/${dirent.name}.pug`)))
      .map((dirent) => dirent.name);
  }

  apply(compiler) {
    compiler.hooks.environment.tap('AutoImportPlugin', () => {
      this.folders.forEach((folder) => {
        this.main(path.resolve(this.pages, `${folder}/${folder}.pug`));
      });
    });

    compiler.hooks.watchRun.tap('AutoImportPlugin', () => {
      this.folders.forEach((folder) => {
        const watcher = fs.watch(path.resolve(this.pages, `${folder}/${folder}.pug`), () => {
          watcher.close();
          this.main(path.resolve(this.pages, `${folder}/${folder}.pug`));
        });
      });
    });

    compiler.hooks.watchClose.tap('AutoImportPlugin', () => {
      this.clean();
    });

    compiler.hooks.done.tap('AutoImportPlugin', () => {
      if (process.env.NODE_ENV === 'production') {
        this.clean();
      }
    });
  }

  main(pugFile) {
    const fileContent = fs.readFileSync(pugFile, 'utf8');
    const lines = fileContent.split('\n');
    const trimedLines = [];
    lines.forEach((line) => {
      trimedLines.push(line.trim());
    });
    const includes = trimedLines.filter((line) => line.startsWith('include'));

    const blocks = [];
    includes.forEach((include) => {
      blocks.push(include.split('/').pop());
    });

    const extend = trimedLines.find((line) => line.startsWith('extends'));

    if (extend !== undefined) {
      const extendPath = extend.split(' ').pop();
      const templateFileContent = fs.readFileSync(path.resolve(pugFile, `../${extendPath}.pug`).replace(/\\/g, '/'), 'utf8');
      const templateFileLines = templateFileContent.split('\n');
      const templateFileTrimedLines = [];
      templateFileLines.forEach((line) => {
        templateFileTrimedLines.push(line.trim());
      });
      const templateFileIncludes = templateFileTrimedLines.filter((line) => line.startsWith('include'));

      if (templateFileIncludes.length !== 0) {
        templateFileIncludes.forEach((include) => {
          blocks.push(include.split('/').pop());
        });
      }
    }

    const scssFiles = [];
    const jsFiles = [];

    blocks.forEach((block) => {
      const blockFolder = path.resolve(this.components, block);
      if (fs.existsSync(blockFolder)) {
        let scssFile = path.resolve(blockFolder, `${block}.scss`);
        scssFile = scssFile.replace(/\\/g, '/');
        if (fs.existsSync(scssFile)) {
          scssFiles.push(scssFile);
        }

        let jsFile = path.resolve(blockFolder, 'init.js');
        jsFile = jsFile.replace(/\\/g, '/');
        if (fs.existsSync(jsFile)) {
          jsFiles.push(jsFile);
        }
      }
    });

    const eslintRules = [
      '/* eslint-disable no-multiple-empty-lines */',
      '/* eslint-disable import/no-duplicates */',
      '/* eslint-disable import/no-absolute-path */',
      '/* eslint-disable import/extensions */',
    ].join('\n');

    const autoImportFile = path.resolve(pugFile, '../autoimport.js');
    fs.writeFile(autoImportFile, eslintRules, () => {
      scssFiles.forEach((file) => {
        const importString = `\nimport '${file}';`;
        fs.appendFileSync(autoImportFile, importString, {
          flag: 'a',
        });
      });

      jsFiles.forEach((file) => {
        const importString = `\nimport '${file}';`;
        fs.appendFileSync(autoImportFile, importString, {
          flag: 'a',
        });
      });

      fs.appendFileSync(autoImportFile, '\n', {
        flag: 'a',
      });
    });
  }

  clean() {
    this.folders.forEach((folder) => {
      const autoImportFile = path.resolve(path.resolve(this.pages, `${folder}/${folder}.pug`), '../autoimport.js');

      if (fs.existsSync(autoImportFile)) {
        fs.unlinkSync(autoImportFile);
      }
    });
  }
}

module.exports = AutoImportPlugin;
