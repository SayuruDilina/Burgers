
function copyTableDataToArray() {
    let table = document.getElementById("CustomerDetailsReport").getElementsByTagName('tbody')[0];
    let rows = table.getElementsByTagName('tr');
    let dataArray = [];

    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        let rowData = {
            orderID: cells[0].textContent,
            total: cells[3].textContent,
            date: cells[4].textContent
        };
        dataArray.push(rowData);
    }

    return dataArray;
}


let currentMonthValue = new Date().getMonth() + 1;
let currentYear = new Date().getFullYear();
let currentdate = new Date().getDate();

function generateReport() {
    let dataArray = copyTableDataToArray();
    var Monthly = {
        outputType: jsPDFInvoiceTemplate.OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "Monthly Sales Report",
        orientationLandscape: false,
        compress: true,
        logo: {
            src: "img/logo.png",
            type: 'PNG',
            width: 40,
            height: 40,
            margin: {
                top: -10,
                left: 0
            }
        },
        stamp: {
            inAllPages: true,
            src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
            type: 'JPG',
            width: 20,
            height: 20,
            margin: {
                top: 0,
                left: 0
            }
        },
        business: {
            name: "S&D Burgers",
            address: "No 115,New City,Halphathota,Baddegama",
            phone: "(+94) 070 2786812",
            email: "SDBurgers@gmail.com",
            website: "www.S&DBurgers.com",
        },
        invoice: {
            label: "Monthly Sales Report: ",
            num: 1,
            invDate: `From: 1/${currentMonthValue}/${currentYear}`,
            invGenDate: `To: ${currentdate}/${currentMonthValue}/${currentYear}`,
            headerBorder: true,
            tableBodyBorder: true,
            header: [
                { title: "#" },
                { title: "Order ID" },
                { title: "Order Date" },
                { title: "Total" }
            ],
            table: dataArray.map((rowData, index) => ([
                index + 1,
                rowData.orderID,
                rowData.date,
                rowData.total
            ])),
            additionalRows: [
                {
                    col1: 'Total:',
                    col2: '145,250.50',
                    col3: 'ALL',
                    style: { fontSize: 14 }
                },
                {
                    col1: 'VAT:',
                    col2: '20',
                    col3: '%',
                    style: { fontSize: 10 }
                },
                {
                    col1: 'SubTotal:',
                    col2: '116,199.90',
                    col3: 'ALL',
                    style: { fontSize: 10 }
                }
            ],
        },
        footer: {
            text: "The invoice is created on a computer and is valid without the signature and stamp.",
        },
        pageEnable: true,
        pageLabel: "Page ",
    };


    jsPDFInvoiceTemplate.default(Monthly);


    console.log("PDF Object created");
}

