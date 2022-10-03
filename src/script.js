let shop=document.getElementById('shop');

// let shopItemData=[]
//  every time  select cart it will store in basket
let basket=JSON.parse(localStorage.getItem("data")) || [];
let generateShop=()=>{
 return(shop.innerHTML= shopItemsData.map((x)=>{
  let{id,name,price,desc,img}=x
  return `
  <div id=products-id-${id}  class="item">
             <img src=${img} alt="">
             <div class="details">
             <h3>${name}</h3>
             <p>${desc}</p>
             <div class="price-quantity">
                 <h2>$ ${price}</h2>
                 <div class="buttons">
                 <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                 <div id=${id} class="quantity">0</div>  
                 <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                 
                 </div>
             </div>
               </div>  
             </div>
  `
 }).join(""));
};


generateShop();

let increment = (id) => {
  let selectedItem = id;
  // it searching for the item where we selected
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

//   console.log(basket);
  update(selectedItem.id);
// //   when weuse local stoge, the basket got saved inside there and setItem is used to set data inside local stoge
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
//   console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
//   console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
//   x previous no and y is next number 0 is default no
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

