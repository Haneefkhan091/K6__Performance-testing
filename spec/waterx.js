
import { sleep, group } from 'k6';
import http from 'k6/http';

export const options = {};

export default function main() {
  let response;
  let csrfToken;

  group('page_1 - https://dripx.iottechnologies.io/login', function () {
    // Previous requests

    response = http.get(
      'https://dripx.iottechnologies.io/api/notifications?limit=10&offset=1&unread=true',
      {
        headers: {
          accept: 'application/json',
          authorization: 'Bearer null',
          'x-requested-with': 'XMLHttpRequest',
          'x-socket-id': '15320.3689826',
          'x-xsrf-token': csrfToken,
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    );
    sleep(1.4);

    response = http.get('https://dripx.iottechnologies.io/api/projects?limit=10&offset=1', {
      headers: {
        accept: 'application/json',
        authorization: 'Bearer null',
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '15320.3689826',
        'x-xsrf-token': csrfToken,
        'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    });
    sleep(1.3);

    response = http.get('https://dripx.iottechnologies.io/api/roles', {
      headers: {
        accept: 'application/json',
        authorization: 'Bearer null',
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '15320.3689826',
        'x-xsrf-token': csrfToken,
        'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    });
    sleep(1.1);

    // Continue with other requests
    // ...
  });


}
