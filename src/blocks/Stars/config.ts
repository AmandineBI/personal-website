import type { Block } from 'payload'

export const Stars: Block = {
  slug: 'stars',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Title for Stars',
      required: true,
    },
  ],
  interfaceName: 'StarsBlock',
}
