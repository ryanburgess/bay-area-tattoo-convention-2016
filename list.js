'use strict';
const fs = require('fs');
const obj = require('./artists.json');
let content = '# Bay Area Tattoo Convention 2016\nList of artists attending the annual Bay Area Tattoo Convention October 21–22–23, 2016 SFO Hyatt Regency';

content += '\n#Artist List\n';

// loop through artists.json to create artist list
for (const artist of obj) {
  content += (`[${artist.artist}](${artist.instagram})
${artist.shop}`);
}

// create readme file
fs.writeFile('./README.md', content, function (err) {
    if (err) throw err;
    console.log('Updated artist list');
});
