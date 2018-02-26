import request from '../request';

import { BASE_API } from '@/const/config';

export function recharge(token, amount) {
  return request(
    `${BASE_API}/test/recharge`,
    'POST',
    {
      'X-Token': token
    },
    {
      amount
    }
  );
}
