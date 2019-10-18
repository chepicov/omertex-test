import { FIELD_TYPES } from 'app.constants';

export default [
  {
    key: 'ethernet',
    title: 'Ethernet Settings',
    fields: [
      {
        name: 'ip',
        label: '',
        type: FIELD_TYPES.RADIO,
        options: [
          {
            title: 'Obtain an IP address automatically (DHCP/BootP)',
            key: 'auto',
          },
          {
            title: 'Use the following IP address',
            key: 'manual',
            children: [
              {
                name: 'address',
                label: 'IP address',
                type: FIELD_TYPES.INPUT,
                isRequired: true,
                regex: /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/,
              },
              {
                name: 'mask',
                label: 'Subnet Mask',
                type: FIELD_TYPES.INPUT,
                isRequired: true,
                regex: /^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/,
              },
              {
                name: 'gateway',
                label: 'Default Gateway',
                type: FIELD_TYPES.INPUT,
                isRequired: false,
              },
            ],
          },
        ],
      },
      {
        name: 'dns',
        label: '',
        type: FIELD_TYPES.RADIO,
        options: [
          {
            title: 'Obtain DNS Server address automatically',
            key: 'auto',
          },
          {
            title: 'Use the following DS server address',
            key: 'manual',
            children: [
              {
                name: 'prefered',
                label: 'Preferred DNS server',
                type: FIELD_TYPES.INPUT,
                isRequired: true,
                regex: /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/,
              },
              {
                name: 'alternative',
                label: 'Alternative DNS server',
                type: FIELD_TYPES.INPUT,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'wireless',
    title: 'Wireless Settings',
    fields: [
      {
        name: 'wifi',
        label: 'Enable wifi',
        type: FIELD_TYPES.CHECKBOX,
        children: [
          {
            name: 'name',
            label: 'Wireless Network Name',
            type: FIELD_TYPES.INPUT,
            isRequired: true,
          },
          {
            name: 'security',
            label: 'Enable Wireless Security',
            type: FIELD_TYPES.CHECKBOX,
            children: [
              {
                name: 'key',
                label: 'Security Key',
                type: FIELD_TYPES.INPUT,
                isRequired: true,
              },
            ],
          },
          {
            name: 'ip',
            label: '',
            type: FIELD_TYPES.RADIO,
            options: [
              {
                title: 'Obtain an IP address automatically (DHCP/BootP)',
                key: 'auto',
              },
              {
                title: 'Use the following IP address',
                key: 'manual',
                children: [
                  {
                    name: 'address',
                    label: 'IP address',
                    type: FIELD_TYPES.INPUT,
                    isRequired: true,
                    regex: /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/,
                  },
                  {
                    name: 'mask',
                    label: 'Subnet Mask',
                    type: FIELD_TYPES.INPUT,
                    isRequired: true,
                    regex: /^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/,
                  },
                  {
                    name: 'gateway',
                    label: 'Default Gateway',
                    type: FIELD_TYPES.INPUT,
                    isRequired: false,
                  },
                ],
              },
            ],
          },
          {
            name: 'dns',
            label: '',
            type: FIELD_TYPES.RADIO,
            options: [
              {
                title: 'Obtain DNS Server address automatically',
                key: 'auto',
              },
              {
                title: 'Use the following DS server address',
                key: 'manual',
                children: [
                  {
                    name: 'prefered',
                    label: 'Preferred DNS server',
                    type: FIELD_TYPES.INPUT,
                    isRequired: true,
                    regex: /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/,
                  },
                  {
                    name: 'alternative',
                    label: 'Alternative DNS server',
                    type: FIELD_TYPES.INPUT,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
