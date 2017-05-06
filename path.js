const path = require('path');

const CURRENT_PATH = path.resolve(__dirname); 
const ROOT_PATH = path.join(__dirname);
const MODULES_PATH = path.join(ROOT_PATH, './node_modules'); 
const BUILD_PATH = path.resolve(ROOT_PATH, 'build'); 
const SERVER_PATH = '/assets/';
const ENTRY_PATH = path.join(ROOT_PATH, './src/js'); 

module.exports = {
  ROOT_PATH,
  BUILD_PATH,
  SERVER_PATH,
  CURRENT_PATH,
  ENTRY_PATH
};
