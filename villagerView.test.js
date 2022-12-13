/**
 * @jest-environment jsdom
 */

 const fs = require('fs');
 const View = require('./villagerView');
 
 describe('Page view', () => {
   it('loads villager data paragraphs from the api', () => {
     document.body.innerHTML = fs.readFileSync('./index.html');
 
     const view = new View();
 
     expect(document.querySelectorAll('p').length).toBe(2);
   });
 });