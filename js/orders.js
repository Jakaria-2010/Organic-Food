import { db } from "./firebase.js";

import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

function loadOrders() {
  
  const table = document.getElementById("ordersTable");
  
  const totalOrders = document.getElementById("totalOrders");
  const pendingOrders = document.getElementById("pendingOrders");
  const deliveredOrders = document.getElementById("deliveredOrders");
  
  const q = query(
    collection(db, "orders"),
    orderBy("createdAt", "desc")
  );
  
  onSnapshot(q, (snapshot) => {
    
    table.innerHTML = "";
    
    let total = 0;
    let pending = 0;
    let delivered = 0;
    
    if (snapshot.empty) {
      
      table.innerHTML = `
                <tr>
                    <td colspan="6">No orders found.</td>
                </tr>
            `;
      
      totalOrders.textContent = "0";
      pendingOrders.textContent = "0";
      deliveredOrders.textContent = "0";
      
      return;
    }
    
    snapshot.forEach((doc) => {
      
      const order = doc.data();
      
      total++;
      
      if (order.status === "Pending") {
        pending++;
      }
      
      if (order.status === "Delivered") {
        delivered++;
      }
      
      let date = "Loading...";
      
      if (order.createdAt) {
        date = order.createdAt.toDate().toLocaleString();
      }
      
      table.innerHTML += `

<tr>

<td>${order.customerName}</td>

<td>${order.phone}</td>

<td>৳${order.total}</td>

<td>

<span class="status ${order.status.toLowerCase()}">

${order.status}

</span>

</td>

<td>${date}</td>

<td>

<button class="actionBtn">

👁 View

</button>

</td>

</tr>

`;
      
    });
    
    totalOrders.textContent = total;
    pendingOrders.textContent = pending;
    deliveredOrders.textContent = delivered;
    
  });
  
}

export { loadOrders };