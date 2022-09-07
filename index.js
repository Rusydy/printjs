const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var fonts = {
	Roboto: {
		normal: 'fonts/Roboto-Regular.ttf',
		bold: 'fonts/Roboto-Medium.ttf',
		italics: 'fonts/Roboto-Italic.ttf',
		bolditalics: 'fonts/Roboto-MediumItalic.ttf'
	}
};

let PdfPrinter = require('pdfmake');
let printer = new PdfPrinter(fonts);
let fs = require('fs');

app.post('/print', (req, res) => {
    print(req.body);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

const invisible_border_color = ['#ffffff', '#ffffff', '#ffffff', '#ffffff'];
const invisible_text_color = '#ffffff';

function print(data) {
    const fields = {
        airwaybill_number: data.airwaybill_number ?? '1234567890', 
        airline_number: data.airline_number ?? '1234567890',
        flight_date: data.flight_date ?? '01/01/2021',
        consignment_content: data.consignment_content ?? 'Consignment Content',
        origin: data.origin ?? 'Origin',
        destination: data.destination ?? 'Destination',
        transit_point: data.transit_point ?? 'Transit Point',
        security_status: data.security_status ?? ['X', 'Y', 'Z'],
        screening_method: data.screening_method ?? 'screening method',
        issued_by: data.issued_by ?? 'Issued By',
        issued_date: data.issued_date ?? '01/01/2021',
        quantity: data.quantity ?? '1',
        weight: data.weight ?? '1',
        vol_weight: data.vol_weight ?? '1',
        remarks: data.remarks ?? 'Remarks',
        truck_number: data.truck_number ?? 'Truck Number',
        seal_number: data.seal_number ?? 'Seal Number',
        truck_driver: data.truck_driver ?? 'Truck Driver',
    };

var docDefinition = {
	content: [
		'DEKLARASI KEAMANAN KIRIMAN',
		'CONSIGNMENT SECURITY DECLARATION (CSD)',
        {
            style : 'table',
            table: {
                body: [
                    [ 
                        {
                            text: `
                                lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna
                            `, 
                            color: invisible_text_color,
                            borderColor: invisible_border_color,
                        }, 
                        {
                            text: `
                                Number of Airwaybill: ${fields.airwaybill_number}
                                Airline Number: ${fields.airline_number}
                                Flight Date: ${fields.flight_date}
                            `,
                            borderColor: invisible_border_color,
                        }
                    ]
                ]
            }
        },
        {
            alignment: 'center',
            text: `${fields.consignment_content}\n \n`,
        }, 
		{
			columns: [
				{
					alignment: 'center',
                    text: fields.origin,
				},
				{
					alignment: 'center',
                    text: fields.destination,
				},
                {
					alignment: 'center',
                    text: fields.transit_point,
				},
                {},
			]
		},
        '\n \n',
        {
            columns: [
                {
                    text: `
                        ${fields.security_status[0]}
                        ${fields.security_status[1]}
                        ${fields.security_status[2]}
                    `,
                },
                {
                    text: `${fields.screening_method}`,
                },
            ]
        }, 
        '\n \n',
        {
            columns: [
                {},
                {
                    text: `${fields.issued_by}`,
                },
                {
                    text: `${fields.issued_date}`,
                },
                {}
            ]
        },
        `\n \n \n`,
        {
            columns: [
                {},
                {},
                {},
                {
                    text: 'Issued By',
                },
                {}
            ]
        },
        `\n \n \n \n`,
        {
            columns: [
                {
                    text: `${fields.quantity}`,
                },
                {},
                {
                    text: `${fields.weight}`,
                },
                {},
                {
                    text: `${fields.vol_weight}`,
                },
                {},
                {
                    text: `${fields.remarks}`,
                }
            ]
        },
        `\n \n \n`,
        {
            columns: [
                {},
                {
                    text: `
                        ${fields.truck_number} \n
                        ${fields.seal_number} \n
                        ${fields.truck_driver}
                    `,
                },
                {}
            ]
        }
	],
	styles: {
		header: {
			fontSize: 18,
			bold: true
		},
		bigger: {
			fontSize: 15,
			italics: true
		}
	},
	defaultStyle: {
		columnGap: 20
	}
};

var pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('pdfs/output.pdf'));
pdfDoc.end();

}