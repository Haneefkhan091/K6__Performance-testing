import http from 'k6/http';
import { sleep } from 'k6';
import { parseHTML } from 'k6/html';

export let options = {
  vus: 10, // Number of virtual users
  iterations: 12, // Number of iterations per virtual user
};

export default function () {
  // Perform initial GET request to retrieve CSRF token
  let initialResponse = http.get('https://dripx.iottechnologies.io/login');
  let doc = parseHTML(initialResponse.body);
  let csrfToken = doc.find('input[name="_token"]').attr('value');

  // Perform login
  let loginPayload = {
    username: 'loremo6641@aaorsi.com',
    password: 'King@123',
  };

  let loginHeaders = {
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': csrfToken, // Include the CSRF token in the request headers
  };

  let loginResponse = http.post('https://dripx.iottechnologies.io/login', JSON.stringify(loginPayload), { headers: loginHeaders });
  console.log(`Login response status code: ${loginResponse.status}`);
  console.log(`CSRF token: ${csrfToken}`);

  sleep(1);
}
