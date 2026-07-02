export let cart;

loadFromStorage();

export function loadFromStorage()
{
  cart=JSON.parse(localStorage.getItem('cart')) ;

  if(!cart)
  {
    cart=[
    {
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:2,
        deliveryOptionId:'3'
    },
    {
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1,
        deliveryOptionId:'2'
    }];
  };
}



//whenever we update cart we need to save it to localStorage
function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addtocart(productId)
{
  //select quantity
  let quantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
  let no;
  if (quantityElement) { // Check if the element was found
    no = Number(quantityElement.value);
  } else {
    no = 1; // Default quantity if selector is not found
  }

  //add to cart
  let matchingItem;
  cart.forEach((item)=>{
    if(productId===item.productId)
    {
      matchingItem=item;
    }
  });

  if(matchingItem)
  {
    matchingItem.quantity+=no;
  }
  else
  {
    cart.push({
    productId:productId,
    quantity:no,
    deliveryOptionId:'1'
    });
  }
  saveToStorage();

}


export function removeFromCart(productId){
    let newcart=[];
    cart.forEach((item)=>{
        if(item.productId!==productId)
        {
            newcart.push(item);
        }
    });
    cart=newcart;
    saveToStorage();
}

export function calculateCartQuantity()
{
  let cartQuantity=0;
  cart.forEach((item)=>{
  cartQuantity+=item.quantity;
  });
  return cartQuantity;
}

export function updateQuantity(productId,newQuantity)
{
  cart.forEach((item)=>{
    if(item.productId===productId)
    {
      item.quantity=newQuantity;
    }
  });
  saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId)
{
  let matchingItem;
  cart.forEach((item)=>{
    if(productId===item.productId)
    {
      matchingItem=item;
    }
  });

  matchingItem.deliveryOptionId=deliveryOptionId;

  saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

export async function loadCartFetch()
{
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();
  console.log(text);
  return text;
}

