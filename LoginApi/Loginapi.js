import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 50, // Number of virtual users (simultaneous connections)
  duration: "30s", // Duration of the test
};

export default function () {
  // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for login
  let url = "https://reqres.in/api/login";

  // Replace 'YOUR_USERNAME' and 'YOUR_PASSWORD' with valid credentials
  let payload = {
    username: "eve.holt@reqres.in",
    password: "cityslicka",
  };

  // Make the POST request to the login API
  let res = http.post(url, payload);

  // Check if the response status is 200 (successful login)
  check(res, {
    "is successful": (r) => r.status === 200,
  });

  sleep(1); // Optional: Add some delay between requests
}
