const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const eventAdapter = new FileSync("./Database/eventMaster.json");
const orderAdapter = new FileSync("./Database/order.json");
const ticketAdapter = new FileSync("./Database/ticket.json");

eventDb= low(eventAdapter);
orderDb=low(orderAdapter);  //This is only for temporary when moving event to ticket
ticketDb=low(ticketAdapter)

orderDb.defaults({  Orders: [] }).write();
ticketDb.defaults({  Tickets: [] }).write();

exports.addItemInTickets = (ticketId ) => {

     
       
    const checkInOrders = findItemInOrders(ticketId);//find item in orders
    console.log('addItemInTickets getting from order: ', checkInOrders);

     
    const matchProduct = ticketDb.get('Tickets').push(checkInOrders).write();
    console.log(matchProduct);
    //ticketDb.get('Tickets').find({ id: itemtoAdd }).assign({ ticketId: ticketNumber }).write(); //change the ticket number when adding a ticket in orders

    alertMessage = {
        status : 'SUCCESS', message : "Item added in Tickets" };
        console.log(alertMessage);

    return alertMessage;
} 

//-------------------------------------------ADD ITEM TO Orders------------------------------------------- */
exports.addItemInOrders = (searchTerm) => 
{

    orderDb.get('Orders').remove().write();   
     
    let itemtoAdd = parseInt(searchTerm);     
    const matchProduct = eventDb.get('Events')
                                .find({ id: itemtoAdd })
                                .value();

    console.log("matched product returned " + matchProduct);

    let ticketIndexToChange = eventDb.get('Events')
                                     .filter({ id: itemtoAdd })
                                     .map('tickets').value();
    
    ticketIndexToChange = parseInt(ticketIndexToChange);
    ticketIndexToChange = ticketIndexToChange - 1; 
    
    if(matchProduct === undefined)
    {
        alertMessage = {
            status : 'ERROR', message : "Invalid product ID. Enter correct ID. " };            
    } 
           
     
        eventDb.get('Events')
                .find({ id: itemtoAdd })
                .assign({ tickets: ticketIndexToChange })
                .write(); //change the ticket number when adding a ticket in orders
        
               
        orderDb.get('Orders').push(matchProduct).write();
        

        orderDb.get("orderdb is now added")

         
        alertMessage = {
            status : 'SUCCESS', message : "Item added in the Orders"};
            console.log(alertMessage);     
      console.log("order add items ends....")
    
    return alertMessage;
} 



exports.getAllEvents = () => {
    return eventDb.get('Events').value();
}

exports.getAllOrders = () => {
    return orderDb.get('Orders').value();
}

exports.getTickets = () => {
    return ticketDb.get('Tickets').value();
}
exports.initialize = () => {
    const isDbExists = eventDb.has('Events').value();

    //Since event is master so do not remove exist data.
    if(!isDbExists){
        eventDb.defaults({ Events: [] }).write();
    }
};
 
function findItemInOrders(itemToFind){
    console.log("itemToFind" + itemToFind );
    const findInOrders = orderDb.get('Orders').find({ ticketId: itemToFind}).value();
    console.log(findInOrders);
    return findInOrders;
}
 
function generateTicketNumber() {
    let alphaNumeric = "";
    var charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
    for (var i = 0; i < 3; i++){
        alphaNumeric += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    
    let randomNumber = Math.floor(Math.random() * (1000));
    let finalTicketNumber = alphaNumeric + randomNumber;
    console.log(alphaNumeric);
    return finalTicketNumber;
}

exports.verifyTicket=(ticket) => 
{
    console.log("ticket to search:" +ticket);
       

    let ticketExist=ticketDb.get('Tickets')
                        .find({ ticketId: ticket })
                        .value();
    console.log(ticketExist.id);
         //exists but , is that alredy verfied?
    if(ticketExist.verified==undefined)
    {
        let verifyMessage = {
            verifyStatus : 'InvalidTicket', message : "Ticket is not valid"};
            
            return verifyMessage;
    }

    if(ticketExist.verified==true)
    {        
        console.log("its already verified")       

        verifyMessage = {
            verifyStatus : 'AlredyVerified', message : "This ticket is already verified by staff"};
                 
        console.log(verifyMessage);
        return verifyMessage;
    }

    ticketDb.get('Tickets').find({ ticketId: ticket }).assign({ verified: true }).write();   
    
    return  verifyMessage = {
        verifyStatus : 'Verified', message : "This ticket verified succesfully"};
            
    
}
function createNewTicketObjectFromEvent(event)
{
    ticket = {
        id : event.id, 
        name : event.name ,
        location : event.location ,
        date : event.date,
        time:event.time,
        ticketId : generateTicketNumber(),
        verified : false
    };
     return ticket;
}
exports.addItemInTickets = (index ) => {
   // let itemtoAdd = parseInt(index);
    console.log('add Item In Tickets: ', index);     

    /* NOT ADD THE SAME PRODUCT TO CART CHECK */     
    const checkInOrders = findItemInOrders(index);//find item in orders
    const newTicket=createNewTicketObjectFromEvent(checkInOrders); 
    console.log("New Ticket are " + newTicket);
    const matchProduct = ticketDb.get('Tickets').push(newTicket).write();
    
    console.log(matchProduct);
    
    alertMessage = {
        status : 'SUCCESS', message : "Item added in Tickets" };
        console.log(alertMessage);

    return alertMessage;
} 

 
// exports.addItemInOrders = (searchTerm) => {
//     let count = 0;
//     let itemtoAdd = parseInt(searchTerm);
//     console.log(itemtoAdd);

//     /* DISPLAY: error message if you try to add a product that does not exist.*/
//     const matchProduct = eventDb.get('Events').find({ id: itemtoAdd }).value();
//     let ticketIndexToChange = eventDb.get('Events').filter({ id: itemtoAdd }).map('tickets').value();
//     ticketIndexToChange = parseInt(ticketIndexToChange);
//     ticketIndexToChange = ticketIndexToChange - 1;
    
//     console.log("ticket Index To Change: ", ticketIndexToChange);
//     //console.log(matchProduct);

//     if(matchProduct === undefined){
//         alertMessage = {
//             status : 'ERROR', message : "Invalid product ID. Enter correct ID. " };
//             console.log(alertMessage);
//     }else{
//         alertMessage = {
//             status : 'SUCCESS', message : "Valid ID. Item found in Events. "
//         }
//         console.log(alertMessage);
//         count += 1;

//     // /* NOT ADD THE SAME PRODUCT TO CART CHECK */     
//     //     const checkInOrders = findItemInOrders(itemtoAdd);//find item in orders
    
  
//         eventDb.get('Events').find({ id: itemtoAdd }).assign({ tickets: ticketIndexToChange }).write(); //change the ticket number when adding a ticket in orders
//         console.log("The ticket number now: ", matchProduct.tickets);
//         orderDb.get('Orders').push(matchProduct).write();
        
//         alertMessage = {
//             status : 'SUCCESS', message : "Item added in the Orders"};
//             console.log(alertMessage);
//         }
  
    
//     return alertMessage;
// } 
