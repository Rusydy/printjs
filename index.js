const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const csd_controller = require('./modules/csd/csd.controller');
const invoice_controller = require('./modules/invoice/invoice.controller');
const { csd_file_name, invoice_file_name } = require('./global_vars');

app.get('/', (req, res) => { 
    res.sendFile(__dirname + '/index.html');
}); 

// Consignment Security Declaration (CSD)
app.get('/csd', (req, res) => {
    res.sendFile(__dirname + '/modules/csd/csd.html');
});
app.get('/api/print/csd', (req, res) => {
    res.sendFile(__dirname + '/pdfs/' + csd_file_name);
});
app.post('/api/print/csd', csd_controller.print);

// Invoice
app.get('/invoice', (req, res) => {
    res.sendFile(__dirname + '/modules/invoice/invoice.html');
});
app.post('/api/print/invoice', invoice_controller.print);
app.get('/api/print/invoice', (req, res) => {
    res.sendFile(__dirname + '/pdfs/' + invoice_file_name);
});

app.get('/api/invoice', (req, res) => {
    res.json(require('./jsons/invoice.json'));
});
app.get('/preview/invoice', (req, res) => {
    res.sendFile(__dirname + '/modules/invoice/invoice.preview.html');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});