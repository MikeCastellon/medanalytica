import { scaleOrdinal, scaleThreshold } from 'd3'

type ValueTextBoxProps = {
  valueKey: string
  value: string
  title: string
  idealRange: [number, number] | [string, string]
  colourRange: string[]
  valueRange: string[]
  widthClass?: string
  decimal?: number
  onClick?: () => void
}

export const ValueTextBox = ({ valueKey, value, title, idealRange, colourRange, valueRange, widthClass = ' w-32 ', decimal = 0, onClick }: ValueTextBoxProps) => {

  const selectColor = scaleOrdinal<string, string>()
    .domain(valueRange)
    .range(colourRange)


  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className={`flex flex-col ${widthClass} border-2 border-light-grey rounded-lg pl-1 pr-2 `}>
        <div className='flex flex-row justify-between'>
          <div className='text-sm pl-1'>{title}</div>
          <div className='text-primary-grey mt-1'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <div className={`text-center text-2xl font-semibold my-1 ${selectColor(value)}`}> {value}</div>

        <div className='flex flex-row justify-center '>
          <div className='flex flex-row items-center h-4 px-1 bg-light-grey bg-opacity-30 rounded-t-sm '>
            <div className='text-[10px] text-primary-grey'>{idealRange[0]}</div>
            <div className='text-[10px] text-primary-grey'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
              </svg>
            </div>
            <div className='text-[10px] text-primary-grey'>{idealRange[1]}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
