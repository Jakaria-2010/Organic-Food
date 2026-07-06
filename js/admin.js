import { protectAdmin } from "./auth.js";
import { setNotificationCount } from "./ui.js";

// Protect the admin page
protectAdmin();

// Hide notification badge at startup
setNotificationCount(0);

// Orders, reports and dashboard modules
// will be added here in the next steps.