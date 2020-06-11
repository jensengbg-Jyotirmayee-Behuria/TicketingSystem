import { getOrder } from "./order.js";

let baseUrl='http://localhost:8001';;
let addEventOrderEndpoint = baseUrl+'/whereitsat/order/add';
let allEventUrl=baseUrl+'/whereitsat/events';


/***************Getting the orders from database */
let orders;
async function getOrders () {
    orders = await getOrder();
    console.log("Here are the orders", orders);
    return await orders;
}

async function addEventToOrders (eventId) {
     
    let url = `${addEventOrderEndpoint}/${eventId}`;
    
    let response = await fetch (url, { method: 'POST' });
    
    let data = await response.json();
     
    
    return data;
}

/***************Getting the events from database */

async function getAllEvents() {   

    const response = await fetch(allEventUrl);
    const data = await response.json();

    return data;
}

let events;

async function getEvents() {
    
    events = await getAllEvents();
    await getOrders();
    displayEvents(events);
}

getEvents();


/**Displaying events in html */
function displayEvents(events) {

    
    const containerElem = document.querySelector('.allEvents');

    for (let event of events) {
        
        let eventCard = document.createElement("div");
        eventCard.classList.add("eventCard");
        eventCard.setAttribute('id', event.id);
        
         
        let eventPlace = document.createElement("h3");
        eventPlace.classList.add("eventPlace");
        eventPlace.innerText = event.location;
        
        
        let eventTime = document.createElement("h3");
        eventTime.classList.add("eventTime");
        eventTime.innerText = event.time;
        
         
        let eventPrice = document.createElement("p");
        eventPrice.classList.add("eventPrice");
        eventPrice.innerText = event.price + " SEK";
        
         
        let eventDate = document.createElement("h3");
        eventDate.classList.add("eventDate");
        eventDate.innerText = event.date;
        
        
        let article = document.createElement('article');
        article.classList.add("eventText");
        let eventName = document.createElement("button");
        eventName.classList.add("eventNameButton");
        eventName.innerHTML = event.name;
        
        article.appendChild(eventName);
        article.appendChild(eventPlace);
        article.appendChild(eventTime);
        
        eventCard.appendChild(eventDate);
        eventCard.appendChild(article);
        eventCard.appendChild(eventPrice);
        containerElem.appendChild(eventCard);
        
        eventName.addEventListener('click', async() => {
                           
        console.log("I have been clicked");
        addEventToOrders(event.id);
        window.location = "order.html";
     
    });        
    }
}//end of display events

