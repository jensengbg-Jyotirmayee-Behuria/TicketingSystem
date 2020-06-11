 
const verifyButtonElem=document.querySelector('#verifyButton')
const ticketNumberInput=document.querySelector('#ticketNumber');
const label=document.querySelector('#verifyresponse');
 


 
async function verifyTicket(ticket)
{
    const url = `http://localhost:8001/whereitsat/ticket/${ticket}`;
    
    const response = await fetch(url);

    const data = await response.json();

    return data;
}
 
async function showResponseMessage(response)
{
     
      
    label.style.display = "block";          
           
     label.innerHTML=response.message;
}

verifyButtonElem.addEventListener('click', async () => {
     
     
    const ticketNumber = ticketNumberInput.value;
    let verifyResponse = await verifyTicket(ticketNumber);
    await showResponseMessage(verifyResponse);
    console.log(verifyResponse);
     
});
