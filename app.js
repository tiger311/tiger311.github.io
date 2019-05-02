const express = require('express');
var app = express();
var upload = require('express-fileupload');
const http = require('http');
var PORT = process.env.PORT || 80;
http.Server(app).listen(PORT); // make server listen on port 80

app.use(upload()); // configure middleware

console.log('Server Started at port ' + PORT);
console.log('the path to app: ' + app.path + 'the _dirname: ' + __dirname);

app.get('/', function(req, res) {
    //res.sendFile(__dirname + '/company_show/show1/index.html');
    res.sendFile(__dirname);
});
// app.post('/company_show/show1', function(req, res) {
//     console.log(req.files);
//     if (req.files.upfile) {
//         var file = req.files.upfile,
//             name = file.name,
//             type = file.mimetype;
//         var uploadpath = __dirname + '/uploads/' + name;
//         file.mv(uploadpath, function(err) {
//             if (err) {
//                 console.log('File Upload Failed', name, err);
//                 res.send('Error Occured!');
//             } else {
//                 console.log('File Uploaded', name);
//                 res.send('Done! Uploading files');
//             }
//         });
//     } else {
//         res.send('No File selected !');
//         res.end();
//     }
// });
