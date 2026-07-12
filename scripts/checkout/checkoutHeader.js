import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader()
{
    let cartQuantity=0;
    cartQuantity=calculateCartQuantity();
    
    const checkoutHeaderHTML=
    `
    <div class="header-content">
    <div class="checkout-header-left-section">
        <a href="index.html" class="brand-logo">ShopNow</a>
    </div>

    <div class="checkout-header-middle-section">
        Checkout (<a class="return-to-home-link"
        href="ecommerce.html">${cartQuantity}</a>)
    </div>

    <div class="checkout-header-right-section">
        <img src="images/icons/checkout-lock-icon.png">
    </div>
    </div>
    `
    let elem=document.querySelector('.js-checkout-header')
    if(elem)
    {
        elem.innerHTML=checkoutHeaderHTML;
    }
    
}
