import { Link } from '@tanstack/react-location'
import _ from 'lodash'
import { ReactNode } from 'react'
import { Book } from '../Common/icons/Book'
import { useGetSolutionsAndCategoryQuery } from '../generated/graphql'

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}

export const Solutions = () => {

  const { data, isLoading, isError } = useGetSolutionsAndCategoryQuery(dataSource)

  if (isLoading) {
    return (
      <>
        <div>Getting your solutions</div>
      </>
    )
  }

  if (isError) {
    return (
      <>
        <div>Could not het solutions at this moment</div>
      </>
    )
  }

  const groupedCategories = _.groupBy(data.Solution, ({ category }) => {
    return category?.name
  })

  return (
    <>
      {data ?
        <div className='ml-[380px]'>
          {
            Object.keys(groupedCategories).map((cat) => {
              return <CategorySection title={cat}>
                {
                  groupedCategories[cat].map((sol) => {
                    return (
                      <Link to={sol.id}>
                        <div className='  flex-1 rounded-lg shadow-md '>
                          <div className=' flex flex-row justify-center items-center h-28 gradient-background rounded-md text-white '>
                            <div className='flex flex-row justify-center items-center w-24 h-24 bg-white rounded-full bg-opacity-10 '>
                              <Book solid={false} />
                            </div>
                          </div>
                          <div className='p-4'>
                            <div className='text-lg'>{sol?.title}</div>
                            <div className='flex flex-row flex-wrap gap-2 mt-4'>
                              {sol?.tags?.map((t: string) => {
                                return (
                                  <div className='text-sm bg-primary-green px-2 py-1 rounded-md text-white'>{t}</div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })
                }
              </CategorySection>
            })
          }
        </div>
        : null
      }
    </>
  )
}

type CategorySectionProps = {
  title: string
  children: ReactNode
}


const CategorySection = ({ title, children }: CategorySectionProps) => {
  return (
    <div className='flex flex-col mt-6'>
      <div className=' text-2xl mb-4 '>{title}</div>
      <div className='grid grid-cols-4 gap-4'>{children}</div>
    </div>
  )
}
