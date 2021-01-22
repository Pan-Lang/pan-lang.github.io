import React from 'react';
import FlagIcon from '@material-ui/icons/Flag';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SyncAltIcon from '@material-ui/icons/SyncAlt';

export const INFO = [
  {
    icon: <FlagIcon fontSize="large" />,
    title: 'Automatic Translations',
    body: [
      'Pan-Lang automatically translates stock items to multiple languages, ensuring that all members of your community can understand your available stock. ',
      "Through Pan-Lang's Stock Dashboard, you can view, create, and edit your available stock so it's synced across all devices.",
    ],
  },
  {
    icon: <ListAltIcon fontSize="large" />,
    title: 'Seamless, Accessible Forms',
    body: [
      'Info, Order, Review. With a simple 3-step process, your patrons can order necessary items in their preferred language.',
      "Stock counts are automatically calculated upon every order, automating your pantry's workflow.",
    ],
  },
  {
    icon: <SyncAltIcon fontSize="large"/>,
    title: 'Track Orders in Real-Time',
    body: [
      'With the Order Tracker, multiple pantry workers and volunteers can track unfulfilled orders in real time, complete with necessary items, basic patron info, and additional notes if necessary.',
      'Pan-Lang automatically records all orders, allowing you to download, view, and send order data to show the progress of your pantry over time.',
    ],
  },
];
