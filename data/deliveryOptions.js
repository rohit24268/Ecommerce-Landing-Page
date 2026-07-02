import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions=[{
    id:'1',
    deliveryDays:7,
    priceCents:0
},
{
    id:'2',
    deliveryDays:3,
    priceCents:499
},
{
    id:'3',
    deliveryDays:1,
    priceCents:799
}];

export function getDeliveryOption(deliveryOptionId)
{
    debugger;
    let deliveryOption;
    //console.log('Searching for deliveryOptionId:', deliveryOptionId);
    deliveryOptions.forEach((option)=>{
        if(option.id===deliveryOptionId)
        {
            deliveryOption=option;//object passed
        }           
    });
    return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption)
{   
    //avoiding saturday and sunday
    const today=dayjs();
    let daysToAdd=deliveryOption.deliveryDays;  
    const day=today.add(daysToAdd,'days').format('d');
    if(day==='0')
        daysToAdd+=1;
    else if(day==='6')
        daysToAdd+=2;
    else
    {
        daysToAdd+=0;
    }
    //final day
    const deliveryDate=today.add(daysToAdd,'days');
    const dateString=deliveryDate.format('dddd,MMMM D');
    
    return dateString;
}
