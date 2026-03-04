import { defineArrayMember, defineField, defineType } from 'sanity';

export const list = defineType({
  name: 'list',
  title: 'List',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order (1, 2, 3...)',
    }),
    defineField({
      name: 'isExternal',
      title: 'External Link',
      type: 'boolean',
      initialValue: false,
      description: 'If true, this list is a link to an external URL instead of expandable items',
    }),
    defineField({
      name: 'href',
      title: 'Link URL',
      type: 'url',
      hidden: ({ parent }) => !parent?.isExternal,
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'listItem',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'href',
              title: 'Link URL',
              type: 'url',
              description: 'Optional. Leave empty for plain text.',
            },
          ],
          preview: {
            select: { label: 'label' },
            prepare: ({ label }) => ({ title: label || 'Untitled item' }),
          },
        }),
      ],
      hidden: ({ parent }) => parent?.isExternal === true,
    }),
  ],
});
