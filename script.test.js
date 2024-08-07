const fs = require('fs');
const path = require('path');
describe('HTML Testing', () => {
    beforeEach(() => {
      const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
      document.body.innerHTML = html;
    });
    test('All html components are correctly displayed', () => {
      
    }); 
  });