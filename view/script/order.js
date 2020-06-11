

async function addOrderToTickets (orderId) {    
    let url = `http://localhost:8001/whereitsat/addticket/${orderId}`;

    let response = await fetch (url, { method: 'POST' });
    let data = await response.json();
    return data;
}

export async function getEventSelected(eventId) {

    const url = `http://localhost:8001/whereitsat/event/${eventId}`;
     
    const response = await fetch(url);

    const data = await response.json();

    return data;
}


export async function getOrder() {

    const url = 'http://localhost:8001/whereitsat/orders';
     
    const response = await fetch(url);

    const data = await response.json();

    return data;
}

let order;

async function getAllOrders () {
    order = await getOrder();
     
    displayOrder(order);
}
 
getAllOrders();

function displayOrder(orders) {

    console.log(orders);
    const containerElem = document.querySelector('.theOrder');
    
    for (let order of orders)     {
         
        containerElem.innerHTML = '';        
        let orderCard = document.createElement("div");
        orderCard.classList.add("orderCard");
        orderCard.setAttribute('id', order.id);
        
        //displaying order place
        let orderPlace = document.createElement("h3");
        orderPlace.classList.add("orderPlace");
        orderPlace.innerText = order.location;
        
        //displaying order time
        let orderTime = document.createElement("h3");
        orderTime.classList.add("orderTime");
        orderTime.innerText = order.time;
        
        //displaying order price
        let orderPrice = document.createElement("p");
        orderPrice.classList.add("orderPrice");
        orderPrice.innerText = order.price + " SEK";
        
        //displaying order date
        let orderDate = document.createElement("h3");
        orderDate.classList.add("orderDate");
        orderDate.innerText = order.date;
        
        //displying order name
        let article = document.createElement('article');
        article.classList.add("orderText");
        let orderName = document.createElement("h1");
        orderName.classList.add("orderName");
        orderName.innerHTML = order.name;   

        //displaying buy button
        let buyButton = document.createElement("button");
        buyButton.classList.add("buyButton");
        buyButton.innerHTML = "Buy";
        buyButton.addEventListener('click', async() => {
             
            addOrderToTickets (order.ticketId);
            window.location = "ticket.html";
        });        

        article.appendChild(orderName);
        orderCard.appendChild(article);

        orderCard.appendChild(orderDate);
        orderCard.appendChild(orderTime);
        
        orderCard.appendChild(orderPlace);
        orderCard.appendChild(orderPrice);
        orderCard.appendChild(buyButton);

        containerElem.appendChild(orderCard);        
       
    }
}//end of display orders