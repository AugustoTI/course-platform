'use client'

import { Button } from '@/components/ui/button'
import { Course } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: 'title',
    header({ column }) {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="gap-x-2"
        >
          Title
          <ArrowUpDown size={16} />
        </Button>
      )
    },
  },
  {
    accessorKey: 'price',
    header({ column }) {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="gap-x-2"
        >
          Price
          <ArrowUpDown size={16} />
        </Button>
      )
    },
    cell({ row }) {
      const price = parseFloat(row.getValue('price') || '0')
      const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price)

      return formattedPrice
    },
  },
  {
    accessorKey: 'isPublished',
    header({ column }) {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="gap-x-2"
        >
          Published
          <ArrowUpDown size={16} />
        </Button>
      )
    },
    cell({ row }) {
      const isPublished = row.getValue('isPublished') || false
      return (
        <Badge className={cn('bg-slate-500', isPublished && 'bg-sky-700')}>
          {isPublished ? 'Published' : 'Draft'}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell({ row }) {
      const { id } = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link
                href={`/teacher/courses/${id}`}
                className="flex w-full items-center gap-x-2"
              >
                <Pencil size={16} />
                Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
