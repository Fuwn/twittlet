const express = require('express');
const app = express();
const path = require('path');
const vul = require('video-url-link');

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

app.get('/', (req, res) => {
    res.render('index', { error: '' });
});

app.post('/submitData', (req, res) => {
    //console.log(req.body.urlInput);
    let twitterPostURL = req.body.urlInput;

    if (twitterPostURL.length < 40) return res.redirect('/');
    // 40 chars is the length of the entire twitter url without the protocol nor the user's handle

    let localURL = req.protocol + '://' + req.get('host'); // + req.originalUrl;
    //console.log(localURL);
    
    res.redirect(localURL + '/api/v1?video=' + twitterPostURL);
});

app.get('/api/v1', (req, res) => {
    let videoURL = req.query.video;
    
    //let video = 'https://twitter.com/threatenedcats/status/1269917580497522689';
    
    vul.twitter.getInfo(videoURL, {}, (error, info) => {
        if (error) return console.log(error);
    
        //console.log(info.full_text);
        //console.log(info.variants);
        res.json({
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

// app.get('*', (req, res) => {
//     res.redirect('/');
// });

app.listen(1337, () => {
    console.log('Listening on port 1337');
});