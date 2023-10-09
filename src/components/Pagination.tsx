'use client'
import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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
  const searchParams = useSearchParams()
  const pageNumber = searchParams.get('page') || '1'
  return (
    <>
      <div className="flex gap-2 justify-center">
        <button
          className={cn(
            'inline-block rounded bg-color-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-color-base',
            {
              'transition duration-150 ease-inhover:bg-emerald-900 hover:shadow hover:shadow-color-primary':
                hasPrevPage,
              'bg-color-neutral': !hasPrevPage,
            },
          )}
          disabled={!hasPrevPage}
          onClick={() => {
            router.push(`blog/?page=${Number(pageNumber) - 1}`)
          }}
        >
          prev page
        </button>

        <button
          className={cn(
            'inline-block rounded bg-color-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-color-base',
            {
              'transition duration-150 ease-inhover:bg-emerald-900 hover:shadow hover:shadow-color-primary':
                hasNextPage,
              'bg-color-neutral': !hasNextPage,
            },
          )}
          disabled={!hasNextPage}
          onClick={() => {
            router.push(`blog/?page=${Number(pageNumber) + 1}`)
          }}
        >
          next page
        </button>
      </div>
      {totalPages && (
        <div className="flex justify-center my-6 ">
          Page {pageNumber} of {totalPages}
        </div>
      )}
    </>
  )
}
export default Pagination
