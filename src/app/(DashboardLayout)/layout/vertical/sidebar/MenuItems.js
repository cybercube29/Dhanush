import { IconLayoutDashboard, IconPoint, IconSettings, IconCloud, IconPlugConnected, IconBrandAsana, IconBrandAws, IconBrandWindows, IconBrandGoogle, IconServer2, IconAlignBoxBottomCenter, IconAlignBoxLeftTop, IconServer, IconDeviceHeartMonitor, IconScan } from '@tabler/icons-react';
import { id } from 'date-fns/locale';
import { uniqueId } from 'lodash';
import { title } from 'process';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Main',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/',
  },
  {
    id: uniqueId(),
    title: 'Dhanush Guard',
    icon: IconSettings,
    href: '/#',
    children: [
      {
        id: uniqueId(),
        title: 'Cloud',
        icon: IconCloud,
        href: '/#',
        children: [
          {
            id: uniqueId(),
            title: 'Cloud Connect',
            icon: IconPlugConnected,
            href: '/cloud-connect',
          },
        ]
      },

      {
        id: uniqueId(),
        title: 'Asset Management',
        icon: IconBrandAsana,
        href: '/#',
        children: [
          {
            id: uniqueId(),
            title: 'All Assets',
            icon: IconServer2,
            href: '/asset-management',
          },
          {
            id: uniqueId(),
            title: 'AWS Accounts',
            icon: IconBrandAws,
            href: '/aws-accounts',
          },
          {
            id: uniqueId(),
            title: 'AZURE Accounts',
            icon: IconBrandWindows,
            href: '/azure-accounts',
          },
          {
            id: uniqueId(),
            title: 'GCP Accounts',
            icon: IconBrandGoogle,
            href: '/gcp-accounts',
          },
        ]
      },
      {
        id: uniqueId(),
        title: 'Scanner',
        icon: IconScan,
        href: '/scanner',
      },
      {
        id: uniqueId(),
        title: 'Compliances',
        icon: IconAlignBoxBottomCenter,
        href: '/#',
        children: [
          {
            id: uniqueId(),
            title: 'All Compliances',
            icon: IconAlignBoxLeftTop,
            href: '/compliances',
          },
          {
            id: uniqueId(),
            title: 'Services',
            icon: IconServer,
            href: '/services-compliances',
          },
          {
            id: uniqueId(),
            title: 'HeatMap',
            icon: IconDeviceHeartMonitor,
            href: '/heat-map',
          },
        ]
      }
    ],
  },
];

export default Menuitems;