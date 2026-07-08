import { auth } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

// Protect admin page
function protectAdmin(callback) {
  
  onAuthStateChanged(auth, (user) => {
    
    if (!user) {
      
      window.location.href = "login.html";
      return;
      
    }
    
    // Show email
    document.getElementById("adminEmail").textContent = user.email;
    
    // Avatar
    const letter = user.email.charAt(0).toUpperCase();
    
    document.getElementById("avatar").textContent = letter;
    document.getElementById("bigAvatar").textContent = letter;
    
    // Run other modules after login
    if (callback) {
      callback(user);
    }
    
  });
  
}

// Logout
async function logout() {
  
  if (!confirm("Are you sure you want to logout?")) {
    return;
  }
  
  await signOut(auth);
  
  window.location.href = "login.html";
  
}

window.logout = logout;

export { protectAdmin };