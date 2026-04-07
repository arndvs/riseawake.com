import { Tag } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  type: 'document',
  icon: Tag,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
  ],
})
