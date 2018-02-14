'use strict';

import store from '@/store';
import { Notification } from 'element-ui';
import { getToken } from '@/utils/auth';

export default function(socket) {
  socket.on('connect', () => {});

  socket.on('msg', payload => {
    switch (payload.type) {
      case 'BUSINESS_NEW_ORDER':
        Notification.info({
          title: '提醒',
          message: payload.message
        });
        store.dispatch('LoadOrders', { pageNo: 1 });
        break;
      default:
        break;
    }
  });
}
