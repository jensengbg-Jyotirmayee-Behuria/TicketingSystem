/**
 *  1: pick ticket from database and display on html
 *  2: after user buys, delete the ticket. 
 *  3: error msg should be displaed if no ticket is selected. 
 *  4: check orders. tickets number should be one less
 */

async function getTicket() {

    const url = 'http://localhost:8001/whereitsat/tickets';
    
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

let ticket;

async function getAllTickets () {
    ticket = await getTicket();
    console.log("In the Ticlet.js file: ", ticket);
    displayTicket(ticket);
}

getAllTickets();

function displayTicket(tickets) {
    console.log(tickets);
    const containerElem = document.querySelector('.theTicket');

    for (let ticket of tickets) {
        containerElem.innerHTML = '';
 
        //displaying ticket card
        let ticketCard = document.createElement("div");
        ticketCard.classList.add("ticketCard");
        ticketCard.setAttribute('id', ticket.id);
      

        //displying ticket name
        let nameSection = document.createElement('section');
        nameSection.classList.add("nameSection");

        let nameTitle = document.createElement("p")
        nameTitle.classList.add("nameTitle")
        nameTitle.innerHTML = "WHAT";

        let ticketName = document.createElement("h1");
        ticketName.classList.add("ticketName");
        ticketName.innerHTML = ticket.name;   
        
        //displaying ticket place
        let placeSection = document.createElement('section');
        placeSection.classList.add("placeSection");

        let placeTitle = document.createElement("p")
        placeTitle.classList.add("placeTitle")
        placeTitle.innerHTML = "WHERE";

        let ticketPlace = document.createElement("h3");
        ticketPlace.classList.add("ticketPlace");
        ticketPlace.innerText = ticket.location;
        
        //displaying ticket time
        let timeSection = document.createElement('section');
        timeSection.classList.add("timeSection");

        let timeTitle = document.createElement("p")
        timeTitle.classList.add("timeTitle")
        timeTitle.innerHTML = "FROM - TO";

        let ticketTime = document.createElement("h3");
        ticketTime.classList.add("ticketTime");
        ticketTime.innerText = ticket.time;
        
        //displaying ticket date
        let dateSection = document.createElement('section');
        dateSection.classList.add("dateSection");

        let dateTitle = document.createElement("p")
        dateTitle.classList.add("dateTitle")
        dateTitle.innerHTML = "WHEN";

        let ticketDate = document.createElement("h3");
        ticketDate.classList.add("ticketDate");
        ticketDate.innerText = ticket.date;

        //displaying barcode image      
        let barCodeSection = document.createElement('section');
        barCodeSection.classList.add("barCodeSection");

        let barCodeImage = document.createElement("img");
        barCodeImage.classList.add("barCodeImage");
        barCodeImage.src = "images/A2ED7barcode.png";

        let ticketNumber = document.createElement("p");
        ticketNumber.classList.add("ticketNumber");
        ticketNumber.innerHTML = ticket.ticketId;  
        
        nameSection.appendChild(nameTitle);
        nameSection.appendChild(ticketName);
        ticketCard.appendChild(nameSection);
        
        placeSection.appendChild(placeTitle);
        placeSection.appendChild(ticketPlace);
        ticketCard.appendChild(placeSection);
        
        dateSection.appendChild(dateTitle);
        dateSection.appendChild(ticketDate);
        ticketCard.appendChild(dateSection);
        
        timeSection.appendChild(timeTitle);
        timeSection.appendChild(ticketTime);
        ticketCard.appendChild(timeSection);
        
        timeSection.appendChild(timeTitle);
        timeSection.appendChild(ticketTime);
        ticketCard.appendChild(timeSection);
        
        barCodeSection.appendChild(barCodeImage);
        barCodeSection.appendChild(ticketNumber);
        ticketCard.appendChild(barCodeSection);
        
        containerElem.appendChild(ticketCard);        
    }
}//end of display orders