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
        try {
          document.getElementById('newOrderVoice').play();
        } catch (err) {}
        store.dispatch('LoadOrders', { pageNo: 1 });
        break;
      case 'BUSINESS_CANCEL_ORDER':
        Notification.warning({
          title: '提醒',
          message: payload.message
        });
        try {
          document.getElementById('cancelOrderVoice').play();
        } catch (err) {}
        store.dispatch('LoadOrders', { pageNo: 1 });
        break;
      case 'BUSINESS_PAY_ORDER':
        Notification.success({
          title: '提醒',
          message: payload.message
        });
        try {
          document.getElementById('payOrderVoice').play();
        } catch (err) {}
        store.dispatch('LoadOrders', { pageNo: 1 });
        break;
      default:
        break;
    }
  });
}
