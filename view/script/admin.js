const eventNameInput=document.querySelector("#eventName");
const eventPlaceInput=document.querySelector("#place");
const eventPriceInput=document.querySelector("#price");
const eventDateInput=document.querySelector("#date");
 
const eventFromTimeInput=document.querySelector("#fromTime");
const eventToTimeInput=document.querySelector("#toTime");
const eventHowmanyInput=document.querySelector("#howmany");
const btnElem=document.querySelector("#addEventBtn");
const label=document.querySelector('#addEventResponse');
 

async function saveEvent()
{

    const addEventApiUrl = 'http://localhost:8001/whereitsat/event/add';
    
    const eventObj = {
        name: eventNameInput.value,
        location: eventPlaceInput.value,
        price:eventPriceInput.value,
        date:eventDateInput.value,        
        fromTime:eventFromTimeInput.value,
        toTime:eventToTimeInput.value,
        tickets:eventHowmanyInput.value
      }
    
      
      const response = await fetch(addEventApiUrl, { 
        method: 'POST', 
        body: JSON.stringify(eventObj), 
        headers: { 'Content-Type': 'application/json' } });
    
   // const data = await response.json();
    label.style.display = "block";    
    label.innerHTML="Add events sucess";
   
}


btnElem.addEventListener('click',async()=> {
    label.innerHTML='';
    saveEvent();
    

});

 