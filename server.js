const express = require('express');
// const { extname } = require('path');
// const render = require('./dist/umi.server');

const app = express();
const port = process.env.PORT || 9000;

// app.use(async (req, res, next) => {
//     const ext = extname(req.url);
//     if (!ext) {
//         const { html } = await render({
//             path: req.url,
//         });
//         res.send(html);
//     } else {
//         next();
//     }
// });

app.use(express.static(__dirname + '/dist'));

app.listen(port, () => {
    console.log(`server listen on ${port}`);
});
