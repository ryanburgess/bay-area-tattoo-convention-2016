const cheerio = require('cheerio');
const request = require('request');
const jsonfile = require('jsonfile');
const artists = [];

request({
    method: 'GET',
    url: 'http://bayareatattooconvention.com/artists/'
}, function(err, response, body, callback) {
  if (err) return console.error(err);
  const $ = cheerio.load(body);
  $('.entry-content ul li').each(function(key, callback){
    const listContent = $(this).find('li');
    const nameShop = $(this).find('span').text();
    let name = nameShop.split(' ');
    let shop = `${name[2]}`;
    if (name[3] !== undefined){
      shop = `${shop} ${name[3].trim()}`;
    }
    name = `${name[0]} ${name[1]}`;
    name = name.trim();
    const instagram = $(this).find('a').attr('href');

   artists.push({'artist': name, 'shop': shop, 'instagram': instagram});
  });

  jsonfile.writeFile('./artists.json', artists, {spaces: 2}, function(err) {
    if(err) {
      console.log(err);
    }else {
      console.log(`done`);
    }
  });
});

