const getImporter = require('./importer');
const getPostProcessor = require('./postProcessor');

module.exports = {
  install: (less, pluginManager) => {
    const Importer = getImporter(less);
    const PostProcessor = getPostProcessor(less);
    pluginManager.addFileManager(new Importer());
    pluginManager.addPostProcessor(new PostProcessor());
  },
  printUsage: () => {
    console.log('');
    console.log('diamond Importer Plugin');
    console.log('specify plugin with --diamond');
    console.log('');
  },
};
