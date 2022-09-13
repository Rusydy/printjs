let PdfPrinter = require('pdfmake');
let fs = require('fs');
const { invoice_file_name, invisible_border_color, invisible_text_color, fonts } = require('../../global_vars');

let printer = new PdfPrinter(fonts);

exports.print = (req, res) => {
    print(req.body);
    res.redirect('/invoice');
}

function print(data) {
    const fields = {
        number: data.invoice_number || 'N/A',
        address: data.invoice_address || 'N/A',
        details: data.invoice_details || 'N/A',
        csc_number: data.csc_number || 'N/A',
        weight: data.weight || 'N/A',
        rate_per_kg: data.rate_per_kg || 'N/A',
        total_amount: data.total_amount || 'N/A',
        total_amount_in_words: data.total_amount_in_words || 'N/A',
        sub_total: data.sub_total || 'N/A',
        tax: data.tax || 'N/A',
        tax_amount: data.grand_total || 'N/A',
    };

    let body_table = []

    for (let i = 0; i < 6; i++) {
        body_table.push([
            { text: `${i + 1}.`, borderColor: invisible_border_color },
            { text: `${fields.csc_number[i]|| ''}`, borderColor: invisible_border_color },
            { text: `${fields.weight[i] || ''}`, borderColor: invisible_border_color },
            { text: `${fields.rate_per_kg[i] || ''}`, borderColor: invisible_border_color }
        ]);
    }

    var docDefinition = {
        content: [
            {
                columns: [
                    {
                        text: 'lore ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
                        color: invisible_text_color,
                    },
                    {
                        text: `
                            Invoice Number: ${fields.number}
                        `,
                        color: invisible_text_color,
                    },
                    {
                        text: `
                            ${fields.number}
                            lore ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ${fields.address}
                        `,
                    }
                ],
            },
            {},
            {},
            {
                style: 'table',
                table: {
                    width: ['*', 150, 100, 100],
                    body: body_table,
                },
            },

        ],

        styles: {
            table: {
                margin: [0, 5, 0, 15],
            },
            headers: {
                bold: true,
                fontSize: 14,
                color: 'black'
            }
        }
    };

    let pdfDoc = printer.createPdfKitDocument(docDefinition);
    let path = 'pdfs/' + invoice_file_name
    pdfDoc.pipe(fs.createWriteStream(path));
    pdfDoc.end();
}