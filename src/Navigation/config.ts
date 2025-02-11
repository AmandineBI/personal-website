// The cration of this file creates a new Global in the Payload UI!
//This is only the config, no front end configured.
import { GlobalConfig } from 'payload'

const Navigation: GlobalConfig = {
  slug: 'navigation',
  fields: [
    {
      name: 'menuItems',
      type: 'array',
      required: true,
      maxRows: 8,
      fields: [
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          unique: true,
        },
      ],
    },
  ],
}
export default Navigation
