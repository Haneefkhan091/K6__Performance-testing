import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp-up to 10 users over 30 seconds
    { duration: '1m', target: 10 },  // Stay at 10 users for 1 minute
    { duration: '30s', target: 20 }, // Ramp-up to 20 users over 30 seconds
    { duration: '1m', target: 20 },  // Stay at 20 users for 1 minute
    { duration: '30s', target: 40 }, // Ramp-up to 40 users over 30 seconds
    { duration: '2m', target: 40 },  // Stay at 40 users for 2 minutes
    { duration: '30s', target: 0 },  // Ramp-down to 0 users over 30 seconds
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should complete within 500ms
    http_req_failed: ['rate<0.1'],    // Error rate should be less than 10%
  },
};

export default function () {
  // Open the homepage
  let res = http.get('https://imo.ls.codesorbit.net/');
  check(res, { 'Homepage is accessible': (r) => r.status === 200 });

  // Perform some actions on the website
  let loginPayload = JSON.stringify({ username: 'your_username', password: 'your_password' });
  res = http.post('https://imo.ls.codesorbit.net/api/login', loginPayload, {
    headers: { 'Content-Type': 'application/json' },
  });
  check(res, { 'Login successful': (r) => r.status === 200 });

  // Make additional requests and assertions as needed
  // For example, you could make API requests, navigate to other pages, etc.

  sleep(1); // Add a short delay between iterations to simulate user think time
}
