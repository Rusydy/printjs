let fs = require('fs');

exports.print = (req, res) => {
    let data = JSON.stringify(req.body, null, 2);
    fs.writeFile('jsons/invoice.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    res.redirect('/invoice');
}