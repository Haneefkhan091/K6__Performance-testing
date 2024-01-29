import { sleep } from 'k6';
import http from 'k6/http';


export let options = {
  stages: [
    // Stay at 40 users for 2 minutes
    { duration: '30s', target: 0 },  // Ramp-down to 0 users over 30 seconds
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should complete within 500ms
    http_req_failed: ['rate<0.1'],    // Error rate should be less than 10%
  },
};
export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}
