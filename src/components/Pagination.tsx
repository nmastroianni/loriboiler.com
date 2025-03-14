'use client'
import { FC } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'

interface PaginationProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  totalPages: number
}

const Pagination: FC<PaginationProps> = ({
  hasNextPage,
  hasPrevPage,
  totalPages,
}) => {
  const router = useRouter()
  const path = usePathname()
  const searchParams = useSearchParams()
  const pageNumber = searchParams.get('page') || '1'
  return (
    <>
      <div className="flex justify-center gap-2">
        <button
          className={cn(
            'inline-block rounded bg-color-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-color-base',
            {
              'ease-inhover:bg-emerald-900 transition duration-150 hover:shadow-sm hover:shadow-color-primary':
                hasPrevPage,
              'bg-color-neutral': !hasPrevPage,
            },
          )}
          disabled={!hasPrevPage}
          onClick={() => {
            router.push(`${path}?page=${Number(pageNumber) - 1}`)
          }}
        >
          prev page
        </button>

        <button
          className={cn(
            'inline-block rounded bg-color-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-color-base',
            {
              'transition duration-150 ease-in hover:bg-color-accent hover:text-color-neutral hover:shadow-sm hover:shadow-color-accent':
                hasNextPage,
              'bg-color-neutral': !hasNextPage,
            },
          )}
          disabled={!hasNextPage}
          onClick={() => {
            router.push(`${path}?page=${Number(pageNumber) + 1}`)
          }}
        >
          next page
        </button>
      </div>
      {totalPages && (
        <div className="my-6 flex justify-center ">
          Page {pageNumber} of {totalPages}
        </div>
      )}
    </>
  )
}
export default Pagination
