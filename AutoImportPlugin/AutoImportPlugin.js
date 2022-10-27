// unable to use import here
const fs = require('fs');
const path = require('path');

class AutoImportPlugin {
  constructor(options) {
    this.pagesDir = options.pages;
    this.componentsDir = options.components;
    this.dirNames = AutoImportPlugin.getSubdirNamesWithPugFiles(options.pages);
  }

  apply(compiler) {
    compiler.hooks.environment.tap('AutoImportPlugin', () => {
      this.dirNames.forEach((dir) => {
        this.main(path.resolve(this.pagesDir, `${dir}/${dir}.pug`));
      });
    });

    compiler.hooks.watchRun.tap('AutoImportPlugin', () => {
      this.dirNames.forEach((dir) => {
        const watcher = fs.watch(path.resolve(this.pagesDir, `${dir}/${dir}.pug`), () => {
          watcher.close();
          this.main(path.resolve(this.pagesDir, `${dir}/${dir}.pug`));
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
    const blockNames = AutoImportPlugin.collectBlocks(pugFile);
    const filesToImport = this.collectFilesToImport(blockNames);
    AutoImportPlugin.importFiles(pugFile, filesToImport);
  }

  clean() {
    this.dirNames.forEach((dir) => {
      const autoImportFile = path.resolve(path.resolve(this.pagesDir, dir), 'autoimport.js');

      if (fs.existsSync(autoImportFile)) {
        fs.unlinkSync(autoImportFile);
      }
    });
  }

  static getSubdirNamesWithPugFiles(dir) {
    return fs.readdirSync(dir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .filter((dirent) => fs.existsSync(path.resolve(dir, `${dirent.name}/${dirent.name}.pug`)))
      .map((dirent) => dirent.name);
  }

  static collectBlocks(pugFile) {
    const blocks = [];

    const getLines = (file) => {
      const fileContent = fs.readFileSync(file, 'utf8');
      const lines = fileContent.split('\n');
      const trimedLines = lines.map((line) => line.trim());
      return trimedLines;
    };

    const getIncludeLines = (lines) => lines.filter((line) => line.startsWith('include'));

    const getBlockNames = (includeLines) => includeLines.map((line) => line.split('/').pop());

    const lines = getLines(pugFile);

    const includeLines = getIncludeLines(lines);
    blocks.push(...getBlockNames(includeLines));

    const extendLine = lines.find((line) => line.startsWith('extends'));
    if (extendLine !== undefined) {
      const templatePath = path.resolve(pugFile, `../${extendLine.split(' ').pop()}.pug`.replace(/\\/g, '/'));
      const templateLines = getLines(templatePath);
      const templateIncludeLines = getIncludeLines(templateLines);

      if (templateIncludeLines.length !== 0) {
        blocks.push(...getBlockNames(templateIncludeLines));
      }
    }

    return blocks;
  }

  collectFilesToImport(blockNames) {
    const filesToImport = [];

    const pushFile = (filePath) => {
      const normalPath = filePath.replace(/\\/g, '/');
      if (fs.existsSync(normalPath)) {
        filesToImport.push(normalPath);
      }
    };

    blockNames.forEach((block) => {
      const blockdir = path.resolve(this.componentsDir, block);

      if (fs.existsSync(blockdir)) {
        const scssFile = path.resolve(blockdir, `${block}.scss`);
        pushFile(scssFile);

        const jsFile = path.resolve(blockdir, 'init.js');
        pushFile(jsFile);
      }
    });

    return filesToImport;
  }

  static importFiles(pugFile, filesToImport) {
    const eslintRules = [
      '/* eslint-disable no-multiple-empty-lines */',
      '/* eslint-disable import/no-duplicates */',
      '/* eslint-disable import/no-absolute-path */',
      '/* eslint-disable import/extensions */',
    ].join('\n');

    const autoImportFile = path.resolve(pugFile, '../autoimport.js');

    fs.writeFile(autoImportFile, eslintRules, () => {
      filesToImport.forEach((file) => {
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
}

module.exports = AutoImportPlugin;
