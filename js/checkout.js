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
    function generateOrderId() {
  
  const now = new Date();
  
  const date =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");
  
  const time =
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0");
  
  const ms =
    String(now.getMilliseconds()).padStart(3, "0");
  
  return `OF-${date}-${time}-${ms}`;
  
}
const orderId = generateOrderId();
    await addDoc(collection(db, "orders"), {
      orderId: orderId,
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
    
    document.getElementById("successOrderId").textContent = orderId;

document.getElementById("successModal").style.display = "flex";
    
    window.location.href = "index.html";
    
  }
  
  catch (error) {
    
    alert(error.message);
    
    console.log(error);
    
  }
  
}