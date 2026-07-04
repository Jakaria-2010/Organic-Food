import { db, auth } from "./firebase.js";

import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

// Check if admin is logged in
onAuthStateChanged(auth, (user) => {
  
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  
  // Show admin email
  document.getElementById("adminEmail").textContent = user.email;
  
  // Show first letter in avatar
  document.getElementById("avatar").textContent =
    user.email.charAt(0).toUpperCase();
  
  loadOrders();
});

// Logout
window.logout = async function() {
  await signOut(auth);
  window.location.href = "login.html";
};

// Load orders
function loadOrders() {
  
  const table = document.getElementById("ordersTable");
  
  const q = query(
    collection(db, "orders"),
    orderBy("createdAt", "desc")
  );
  
  onSnapshot(q, (snapshot) => {
    
    table.innerHTML = "";
    
    if (snapshot.empty) {
      
      table.innerHTML = `
            <tr>
                <td colspan="6">No orders found.</td>
            </tr>
            `;
      
      return;
    }
    
    snapshot.forEach((doc) => {
      
      const order = doc.data();
      
      table.innerHTML += `
            <tr>

                <td>${order.customerName}</td>

                <td>${order.phone}</td>

                <td>৳${order.total}</td>

                <td>${order.status}</td>

                <td>
                    ${order.createdAt
                        ? order.createdAt.toDate().toLocaleString()
                        : "Loading..."}
                </td>

                <td>
                    👁
                </td>

            </tr>
            `;
      
    });
    
  });
  
}