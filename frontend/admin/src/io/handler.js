'use strict';

import store from '@/store';
import { Message } from 'element-ui';
import { getToken } from '@/utils/auth';

export default function(socket) {
  socket.on('connect', () => {});

  socket.on('msg', payload => {
    switch (payload.type) {
      case 'BUSINESS_NEW_ORDER':
        Message({
          message: payload.message,
          type: 'success',
          duration: 2 * 1000
        });
        store.dispatch('LoadOrders', { pageNo: 1 });
        break;
      default:
        break;
    }
  });
}
