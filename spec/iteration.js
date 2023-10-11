import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 10, // Number of virtual users
  iterations: 11, // Number of iterations per virtual user
};

export default function () {
  // Make an HTTP request
  let response = http.get('https://dripx.iottechnologies.io/login');

  // Output the response status code
  console.log(`Response status code: ${response.status}`);

  // Sleep for 1 second between iterations
  sleep(1);
}
