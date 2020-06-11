const express = require('express');
const app = express();
const path = require('path');
const vul = require('video-url-link');
const { default: Axios } = require('axios');

// side-note: this is best used with a api testing service like postman for now. reason being; when actually performing a query,
// the page just spits out a bunch of json shit so it not super readable for now.
// never mind i fixed this with the prettify package lol
// never mind, package don't wanna work so stack overflow it is )))
// https://stackoverflow.com/questions/32679505/node-and-express-send-json-formatted
// holy shit JSON.parse() broke this shit

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.set('json spaces', 2);

const defaultErrorMsg = 'This mode currently returns 4 different videos, once of which being a .m3u8 file. At the moment I haven\'t added a way to filter out this .m3u8 file. Honestly I don\'t know why Twitter doesn\'t have a consistent API standard, but that\'s beyond the point. Anyways, 4 files are returned, and of the three video mp4s, they are all different resolutions. I haven\'t added a way to detect the resolution of the video but that is probably simple enough and might be added later, for now, just hover over the links and check after the /vid/ area.';

app.get('/', (req, res) => {
    return res.render('index', {
        error: defaultErrorMsg,
        tAddon: '',
        modeRef: '<a href="/api">API Mode</a>',
        modeAction: '/download',
        videoLinks: '',
        buttonContext: 'Download Video'
    });
});

app.get('/api', (req, res) => {
    return res.render('index', {
        error: 'API mode basically just returns all the JSON data of your given URL.',
        tAddon: '- API Mode',
        modeRef: '<a href="/">Standard Mode</a>',
        modeAction: '/submitData',
        videoLinks: '',
        buttonContext: 'Get API Data'
    });
});

app.post('/submitData', (req, res) => {
    let twitterPostURL = req.body.urlInput;

    if (twitterPostURL.length < 40) return res.redirect('/');
    // 40 chars is the length of the entire twitter url without the protocol nor the user's handle

    let localURL = req.protocol + '://' + req.get('host'); // + req.originalUrl;
    
    return res.redirect(localURL + '/api/v1?video=' + twitterPostURL);
});

app.post('/download', async (req, res) => {
    let twitterPostURL = req.body.urlInput;

    if (twitterPostURL.length < 40) return res.redirect('/');
    // 40 chars is the length of the entire twitter url without the protocol nor the user's handle

    let localURL = req.protocol + '://' + req.get('host');

    let APIDataRe = await Axios.get(localURL + '/api/v1?video=' + twitterPostURL);
    let TwitterEndpoint = await APIDataRe.data.videoURLs;

    let videoList = '<ul>';
    let videoNum = 0;
    TwitterEndpoint.forEach(video => {
        videoList += '<li><a href="' + TwitterEndpoint[videoNum].url + '" target="_blank">Download Video ' + (videoNum + 1) + '</a></li>';
        videoNum++;
    });
    videoList += '</ul>';

    return res.render('index', {
        error: defaultErrorMsg,
        tAddon: '',
        modeRef: '<a href="/api">API Mode</a>',
        modeAction: '/download',
        videoLinks: videoList,
        buttonContext: 'Download Video'
    });
});

app.get('/api/v1', (req, res) => {
    let videoURL = req.query.video;
    
    vul.twitter.getInfo(videoURL, {}, (error, info) => {
        if (error) return res.redirect('/');
    
        return res.json({
            _comment: 'This is a link to the same Twitter post, except short.',
            videoURLShort: info.full_text,
            _comment2: 'These are links to the Twitter post media in various different formats.',
            videoURLs: info.variants
        });
        // no idea why but shit don't stop erroring, however,
        // it does stop erroring when its in a separate file
        // and honestly i don't have a care in the world
        // why it does it, u can fix this if u want )
    });
});

app.get('*', (req, res) => {
    return res.redirect('/');
});

app.listen(1337, () => {
    console.log('Listening on port 1337');
});
