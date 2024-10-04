function getItemReport() {


    let burgerData = JSON.parse(localStorage.getItem('burgerData')) || [];
    let submarineData = JSON.parse(localStorage.getItem('submarineData')) || [];
    let friesData = JSON.parse(localStorage.getItem('friesData')) || [];
    let pastaDta = JSON.parse(localStorage.getItem('PastaData')) || [];
    let ChickenDta = JSON.parse(localStorage.getItem('ChickenData')) || [];
    let BeavaragesDta = JSON.parse(localStorage.getItem('Beverages')) || [];
    let reportData = [];
    function addToReport(data, category) {
        data.forEach(item => {
            console.log('Item Quantity:', item.Qty);
            reportData.push({
                category: category,
                itemCode: item.itemCode,
                itemName: item.itemName,
                price: item.price,
                quantity: item.Qty
            });
        });
    }
    addToReport(burgerData, 'Burger');
    addToReport(submarineData, 'Submarine');
    addToReport(friesData, 'Fries');

    addToReport(pastaDta, 'Pasta');
    addToReport(ChickenDta, 'Chicken');
    addToReport(BeavaragesDta, 'Bevarages');

    let currentMonthValue = new Date().getMonth() + 1;
    let currentYear = new Date().getFullYear();
    let currentdate = new Date().getDate();


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
        contact: {
            label: "Report issued for:",
            address: "Icet Panadura.",
            phone: "(+94) 76 488 77322",
            email: "BQBurgers@gmail.com",
            otherInfo: "www.BQBurgers.com",
        },
        invoice: {
            label: "Monthly Sales Report: ",
            num: 1,
            invDate: `From: 1/${currentMonthValue}/${currentYear}`,
            invGenDate: `To: ${currentdate}/${currentMonthValue}/${currentYear}`,
            headerBorder: true,
            tableBodyBorder: true,
            header: [
                { title: "Item Code" },

                { title: "Item Name" },
                { title: "Quantity" }
            ],
            table: reportData.map((data) => ([
                data.itemCode,


                data.itemName,
                String(data.quantity)
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