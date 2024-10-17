const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    this.on('Employees',   fetchData );

});
async function fetchData(req, res) {
    try {
        const GTTapi = await cds.connect.to('WS1');
        const res = await GTTapi.send({
            method: 'GET',
            path: '/Employees',
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res2 = await GTTapi.send({
            method: 'GET',
            path: '/Customers',
            headers: {
                "Content-Type": "application/json",
            },
        });
        const combinedJson = { res, res2 }
 
        return combinedJson
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error; 
    }
}

// async function fetchData(req, res) {
//     try {
//         const GTTapi = await cds.connect.to('WS1');
//         const res = await GTTapi.send({
//             method: 'GET',
//             path: '/Customers',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         return res
//     } catch (error) {
//         console.error('Failed to fetch data:', error);
//         throw error; 
//     }
// }