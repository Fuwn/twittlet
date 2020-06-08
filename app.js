const vul = require('video-url-link');

let video = 'https://twitter.com/threatenedcats/status/1269917580497522689';

vul.twitter.getInfo(video, {}, (error, info) => {
    if (error) console.log(error);

    console.log(info.full_text);
    console.log(info.variants);
});