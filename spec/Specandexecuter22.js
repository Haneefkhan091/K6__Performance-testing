import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  scenarios: {
    constantLoad: {
      executor: 'constant-arrival-rate',
      rate: 10, // 10 requests per second
      timeUnit: '1s', // time unit for the arrival rate
      duration: '1m', // total duration of the scenario
      preAllocatedVUs: 10, // number of VUs to pre-allocate
      maxVUs: 20, // maximum number of VUs
    },
    spikeLoad: {
      executor: 'ramping-arrival-rate',
      startRate: 5, // starting arrival rate
      timeUnit: '1s', // time unit for the arrival rate
      preAllocatedVUs: 10, // number of VUs to pre-allocate (reduced from 20)
      maxVUs: 40, // maximum number of VUs
      stages: [
        { duration: '30s', target: 10 }, // Ramp-up to 10 requests per second over 30 seconds
        { duration: '1m', target: 10 }, // Stay at 10 requests per second for 1 minute
        { duration: '30s', target: 20 }, // Ramp-up to 20 requests per second over 30 seconds
        { duration: '1m', target: 20 }, // Stay at 20 requests per second for 1 minute
        { duration: '30s', target: 0 }, // Ramp-down to 0 requests per second over 30 seconds
      ],
    },
    scenarios: {
        myScenario: {
          executor: 'per-vu-iterations',
          vus: 10, // Number of VUs
          iterations: 100, // Number of iterations per VU
        },
      },

      scenarios: {
        myScenario: {
          executor: 'per-vu-constant',
          vus: 10, // Number of VUs
          duration: '1m', // Duration per VU
        },
      },
      

  },
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should complete within 500ms
    http_req_failed: ['rate<0.1'], // Error rate should be less than 10%
  },
};

export default function () {
  // Open the homepage
  let res = http.get('https://imo.ls.codesorbit.net/');
  check(res, { 'Homepage is accessible': (r) => r.status === 200 });

  sleep(1); // Add a short delay between iterations to simulate user think time
}
