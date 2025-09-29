let backend_url;

if (window.location.hostname === "localhost") {
  backend_url = "http://localhost:7777";
} else {
  backend_url = "https://hirebuddy-backend-7e8u.onrender.com";
}

export { backend_url };
