import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'styles',
      type: 'array',
      fields: [
        {
          name: 'cssLink',
          type: 'text',
        },
      ],
    },
    {
      name: 'scripts',
      type: 'array',
      fields: [
        {
          name: 'jsLink',
          type: 'text',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
