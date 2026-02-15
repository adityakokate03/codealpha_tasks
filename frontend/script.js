let cart=[];

fetch("http://localhost:3000/api/products")
.then(res=>res.json())
.then(data=>{
  const div=document.getElementById("products");
  data.forEach(p=>{
    div.innerHTML+=`
      <p>${p.name} - ₹${p.price}
      <button onclick="addToCart('${p.name}',${p.price})">Add</button></p>
    `;
  });
});

function addToCart(name,price){
  cart.push({name,price});
  localStorage.setItem("cart",JSON.stringify(cart));
  alert("Added to cart");
}

function checkout(){
  const cart=JSON.parse(localStorage.getItem("cart"));
  const total=cart.reduce((a,b)=>a+b.price,0);

  fetch("http://localhost:3000/api/orders",{
    method:"POST",
    headers:{ "Content-Type":"application/json"},
    body:JSON.stringify({products:cart,total})
  });

  alert("Order Placed!");
  localStorage.clear();
}
