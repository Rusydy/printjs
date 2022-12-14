const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const csd_controller = require('./modules/csd/csd.controller');
const invoice_controller = require('./modules/invoice/invoice.controller');
const handover_controller = require('./modules/handover/handover.controller');
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

// Handover
app.get('/handover', (req, res) => {
    res.sendFile(__dirname + '/modules/handover/handover.html');
});

app.get('/api/handover', (req, res) => {
    res.json(require('./jsons/handover.json'));
});

app.get('/preview/handover', (req, res) => {
    res.sendFile(__dirname + '/modules/handover/handover.preview.html');
});

app.post('/api/print/handover', handover_controller.print);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});