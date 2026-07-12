
import {cart,removeFromCart, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products,getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
//instead of adding a script in html,we can import (module) this way
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
//dayjs
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {calculateDeliveryDate, deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';




export function renderOrderSummary()
{

    //display cart products
    let cartSummaryHtml='';

    cart.forEach((cartItem)=>{

        const productId=cartItem.productId;

        const matchingProduct=getProduct(productId);
        
       // console.log(matchingProduct.id);

        //delivery date heading
        const deliveryOptionId=cartItem.deliveryOptionId;

        const deliveryOption=getDeliveryOption(deliveryOptionId);

        const dateString=calculateDeliveryDate(deliveryOption);

        cartSummaryHtml+=
        `
        <div class="cart-item-container
        js-cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date : ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                <span>
                Quantity: 
                <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>

                <span class="update-quantity-link link-primary js-update-link"
                data-product-id="${matchingProduct.id}">
                Update
                </span>

                <span><input class="quantity-input quantity-input-${matchingProduct.id}"></input></span>
                <span class="link-primary save-quantity-link">Save</span>

                <span class="delete-quantity-link link-primary js-delete-link
                js-delete-link-${matchingProduct.id}"
                data-product-id="${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHtml(matchingProduct,cartItem)};
            </div>
        </div>
        </div>
        `
    });
    let elem=document.querySelector('.js-order-summary')
    if(elem)
        {
            elem.innerHTML=cartSummaryHtml;
        }

    //deliveryOptions
    function deliveryOptionsHtml(matchingProduct,cartItem)
    {
        let html='';
        
        deliveryOptions.forEach((deliveryOption)=>{

            const dateString=calculateDeliveryDate(deliveryOption);

            //

            const priceString=deliveryOption.priceCents
            ===0?'Free':`₹${formatCurrency(deliveryOption.priceCents)}-`;

            //for selecting radio button
            const isChecked=deliveryOption.id===cartItem.deliveryOptionId;

            html+= `
            <div class="delivery-option js-delivery-option"
                        data-product-id="${matchingProduct.id}"
                        data-delivery-option-id="${deliveryOption.id}">

                <input type="radio" 
                ${isChecked?'checked':' '}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString}
                </div>
                </div>
            </div>
            `
        });
        return html;
    }

    //delete link
    document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
        link.addEventListener('click',()=>{
            const productId=link.dataset.productId;
            
            //remove from cart
            removeFromCart(productId);
            //console.log(cart);

           
            renderOrderSummary();
            
            renderCheckoutHeader();

            renderPaymentSummary();
        });
    });

    //update link
    document.querySelectorAll('.js-update-link')
    .forEach((link)=>{
        link.addEventListener('click',()=>{

            const productId=link.dataset.productId;

            //display input and save
            let container=document.querySelector(`.js-cart-item-container-${productId}`)
            container.classList.add("is-editing-quantity");

            document.querySelectorAll('.save-quantity-link')
            .forEach((link)=>{
                link.addEventListener('click',()=>{
                    //disappear input and save
                    let container=document.querySelector(`.js-cart-item-container-${productId}`)
                    container.classList.remove("is-editing-quantity");

                    //update quantity
                    let quantity=document.querySelector(`.quantity-input-${productId}`).value;
                    quantity=Number(quantity);
                
                    if(quantity>=1 && quantity<=100)
                    {
                        updateQuantity(productId,quantity);                   
                    }
                    else
                    {
                        alert("Please enter valid amount of quantity.")
                    }
                    document.querySelector(`.js-quantity-label-${productId}`)
                    .innerHTML=quantity;
                    
                    //updateCartQuantity
                    renderCheckoutHeader();
                    renderOrderSummary();
                    renderPaymentSummary();
                    
                });
            });

        });
        
    });
    
    
     
    

    //update delivery option
    document.querySelectorAll('.js-delivery-option')
    .forEach((element)=>{
        element.addEventListener('click',()=>{
            
            const {productId,deliveryOptionId}=element.dataset; 
            updateDeliveryOption(productId,deliveryOptionId);

            //MVC Model-View-Controller
            renderCheckoutHeader();
            renderOrderSummary();
            renderPaymentSummary();
        });
    });

}


