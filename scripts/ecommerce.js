
//cltrl+f to find 
import {cart,addtocart, calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { loadProducts } from '../data/products.js';
//.. represents outside folder 

loadProducts(renderProductsGrid);
//renderProductsGrid();
function renderProductsGrid()
{

  let productsHtml="";

  //sorting products according to search(names)
  //else you could directly loop through products
  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;

  // If a search exists in the URL parameters,
  // filter the products that match the search.
  // includes returns true or false
  if (search) {
    filteredProducts = products.filter((product) => {
        let matchingKeyword = false;

        product.keywords.forEach((keyword) => {
          if (keyword.toLowerCase().includes(search.toLowerCase())) {
            matchingKeyword = true;
          }
        });

        return matchingKeyword ||
          product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  filteredProducts.forEach((product) => {

    const html=`
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;

        productsHtml+=html;
  });

  

  //storing search result in url
  document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `ecommerce.html?search=${search}`;
    });

  //console.log(productsHtml);
  let elem=document.querySelector('.js-products-grid');
  elem.innerHTML=productsHtml;

  //make add to cart button interactive
  document.querySelectorAll('.js-add-to-cart')
    .forEach((button)=>{
      button.addEventListener('click',()=>{
        //console.log(button.dataset);
        //console.log(button.dataset.productName);
        const productId=button.dataset.productId;

        addtocart(productId);

        //update cart quantity
        updateCartQuantity()

        //added to cart text
        let element=document.querySelector(`.js-added-${productId}`);
        element.classList.add("js-added-to-cart");

        let timeout=false;
        function added()
        {
          let timeout1;
          if(timeout===false)
          {
            timeout1=setTimeout(()=>{       
            element.classList.remove("js-added-to-cart");
            },2000);
            timeout=true;
          }
          else
          {
            clearTimeout(timeout1);
            timeout=false;
          }
          
        }
        added();
      }); 
      
  });
  function updateCartQuantity()
  {
  let cartQuantity=calculateCartQuantity();
  document.querySelector('.js-cart-quantity')
  .innerHTML=cartQuantity;
  }

}
