let base;
switch (import.meta.env.VITE_USE_URL) {
  case "local":
    base = "http://localhost:3000";
    break;
  case "deployed":
    base = "https://backend-store-rating-app-1.onrender.com";
    break;
}
console.log(base);
const url = (endpoint) => `${base}/${endpoint}`;

const store_url = {
  "admin-stats": url("data-stats"),
  "sign-in": url("sign-in"),
  "sign-up": url("sign-up"),
  "store-list": url("store-list"),
  "user-list": url("user-list"),
  "reset-password": url("reset-password"),
  "get-user-rating": url("get-user-rating"),
  "submit-rating": url("submit-rating"),
  "store-stats": url("store-stats"),
};

export default store_url;
