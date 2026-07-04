import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// Load cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsDiv = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

let total = 0;

// Display cart
cart.forEach(item => {
  
  cartItemsDiv.innerHTML += `
        <div class="cart-item">
            <b>${item.name}</b><br>
            Price: ৳${item.price}
        </div>
    `;
  
  total += Number(item.price);
  
});

totalPrice.innerText = total;

// Place Order
window.placeOrder = async function() {
  
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  
  if (name === "" || phone === "" || address === "") {
    alert("Please fill in all information.");
    return;
  }
  
  try {
    
    await addDoc(collection(db, "orders"), {
      
      customerName: name,
      phone: phone,
      address: address,
      
      items: cart,
      
      total: total,
      
      status: "Pending",
      
      read: false,
      
      createdAt: serverTimestamp()
      
    });
    
    localStorage.removeItem("cart");
    
    alert("Order placed successfully!");
    
    window.location.href = "index.html";
    
  }
  
  catch (error) {
    
    alert(error.message);
    
    console.log(error);
    
  }
  
}