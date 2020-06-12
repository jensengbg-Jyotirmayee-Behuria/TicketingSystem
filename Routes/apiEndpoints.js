const db = require('../Database/database');

const { Router } = require('express');
const router = new Router();

//Add a event by admin
    router.post('/event/add',async (req, res) => {
        
        let bodyVar=req.body;
        console.log(bodyVar);
        const eventObj = {
            name: req.body.name,
            location: req.body.location,
            price:req.body.price,
            date:req.body.date,
            time:req.body.fromTime +'-' +req.body.toTime,
            tickets:req.body.tickets

        }        
        
        let obj = db.addEvent(eventObj);   
        res.send(JSON.stringify(obj));
        return obj;
    })

    //Fetch all events 
    router.get('/events', (request, response) => {
            //Get all events 
            let allEvents = db.getAllEvents();
            response.send(JSON.stringify(allEvents));         
        
    });
    
    //User wants to add an event as order 
    router.post('/order/add/:id', (req, res) => {
        const id = req.params.id;        
        let obj = db.addItemInOrders(id);   
        res.send(JSON.stringify(obj));
        return obj;
    })

    // router.post('/event/add',async (req, res) => {       
    //     let bodyVar=req.body;
    //     console.log(bodyVar);
    //     const eventObj = {
    //         name: req.body.name,
    //         location: req.body.location,
    //         price:req.body.price,
    //         date:req.body.date,
    //         time:req.body.time,
    //         tickets:req.body.tickets
    //       }        
    //     console.log("request receiving");
    //     console.log(bodyVar);
    //      let obj = db.addEvent(eventObj);   
    //     res.send(JSON.stringify(obj));
    //     return obj;
    // })
    //Add tickets triggered from order    
    router.post('/addticket/:id', (req, res) => {

        const id = req.params.id;
        let obj = db.addItemInTickets(id);   
        res.send(JSON.stringify(obj));
        return obj;
    })
    //Display all order being added
    router.get('/orders', (req, res) => {
        let allOrders = db.getAllOrders();
        res.send(JSON.stringify(allOrders));       
       
    });

    //All tickets
    router.get('/tickets', (req, res) => {
        let allTickets = db.getTickets();
        res.send(JSON.stringify(allTickets));        
         
    });

    //Get ticket info against ticket id
    router.get('/ticket/:ticketnumber', (req, res) => {
        let ticket=req.params.ticketnumber;
        let assignedTicket = db.verifyTicket(ticket);
        res.send(JSON.stringify(assignedTicket));        
        
    });


    module.exports = router;
