import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  iterations: 1000,
};
export default function () {
  const res = http.get('https://imo.ls.codesorbit.net/');
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}
