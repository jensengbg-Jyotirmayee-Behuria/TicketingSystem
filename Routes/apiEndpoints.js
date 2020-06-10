const db = require('../Database/database');

module.exports = (app) => {
   
    app.get('/whereitsat/events', (request, response) => {
         //Get all events 
         let allEvents = db.getAllEvents();
         response.send(JSON.stringify(allEvents));         
        
    });
   
    app.post('/whereitsat/order/add/:id', (req, res) => {

        const id = req.params.id;
        console.log("request received ");
        let obj = db.addItemInOrders(id);   
        res.send(JSON.stringify(obj));
        return obj;
    })



    app.post('/whereitsat/addticket/:id', (req, res) => {

        const id = req.params.id;
        let obj = db.addItemInTickets(id);   
        res.send(JSON.stringify(obj));
        return obj;
    })

    app.get('/whereitsat/orders', (req, res) => {
        let allOrders = db.getAllOrders();
        res.send(JSON.stringify(allOrders));       
       
    });

    //All tickets
    app.get('/whereitsat/tickets', (req, res) => {
        let allTickets = db.getTickets();
        res.send(JSON.stringify(allTickets));        
         
    });

    //Get ticket info against ticket id
    app.get('/whereitsat/ticket/:ticketnumber', (req, res) => {
        let ticket=req.params.ticketnumber;
        let assignedTicket = db.verifyTicket(ticket);
        res.send(JSON.stringify(assignedTicket));        
        
    });


     
}