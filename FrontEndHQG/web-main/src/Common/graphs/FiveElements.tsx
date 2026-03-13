import { select, selector, svg } from 'd3'
import React, { ReactNode, useLayoutEffect, useRef } from 'react'
import { useDescriptionModal } from '../../Hooks/DescriptionModal'
import { useResizeObserver } from '../../Hooks/useResizeObserver'
import { BasicModalElement } from '../Modals/BasicModalElement'
import { BasicCircleElements } from './FiveElements/BasicCircleElements'
import { BasicTextElements } from './FiveElements/BasicTextElements'
import { FireElements } from './FiveElements/FireElements'

type FiveElementsProps = {
  insideChildren: ReactNode[]
  insideTextChildren: ReactNode[]
  outsideChildren: ReactNode[]
  outsideTextChildren: ReactNode[]
}

const items = [
  {
    d: 90,
    t: "1"
  },
  {
    d: 90 - 72,
    t: "2"
  },
  {
    d: 90 - 144,
    t: "3"
  },
  {
    d: 90 - 216,
    t: "4"
  },
  {
    d: 90 - 288,
    t: "5"
  }
]

const overAllItems = [
  {
    name: "Fire",
    value: 23,
    color: 'primary-red'
  },
  {
    name: "FireMinister",
    value: 23,
    color: 'primary-red'
  },
  {
    name: "Earth",
    value: 23,
    color: 'primary-yellow'
  },
  {
    name: "Metal",
    value: 23,
    color: 'secondary-grey'
  },
  {
    name: "Water",
    value: 23,
    color: 'primary-blue'
  },
  {
    name: "Wood",
    value: 23,
    color: 'primary-green'
  },
]

export const selectItem = (selector: string, color: string) => {
  select(`#${selector}-inside`).attr("class", `fill-${color} stroke-${color}`)
  select(`#${selector}-outside`).attr("class", `fill-${color} stroke-${color}`)
  select(`#key-${selector}`).attr("class", `fill-${color}`)
  select(`#text-${selector}`).attr("class", `fill-white`)

}
export const selectItem2 = (selector: string, color: string) => {
  select(`#${selector}-inside`).attr("class", `fill-transparent stroke-${color}`)
  select(`#${selector}-outside`).attr("class", `fill-transparent stroke-${color}`)
  select(`#key-${selector}`).attr("class", `fill-transparent stroke-${color}`)
  select(`#text-${selector}`).attr("class", `fill-charcoal`)
}


export const FiveElements = ({ insideChildren, insideTextChildren, outsideChildren, outsideTextChildren }: FiveElementsProps) => {

  const { isOpen, setClosed, setOpen, descriptionElement } = useDescriptionModal()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)

  const dimensions = useResizeObserver(wrapperRef)
  const margin = { top: 50, right: 40, bottom: 50, left: 40 }
  const width = dimensions?.width || 200 - margin.left - margin.right
  const height = dimensions?.width || 500 //dimensions?.height || - margin.top - margin.bottom;
  const mainCircleX = width / 10 * 3.5
  const p_radius = width / 4

  const genCoordinates = (degrees: number, radius: number) => {
    let x = Math.cos(degrees * Math.PI / 180) * radius
    let y = Math.sin(degrees * Math.PI / 180) * radius
    return [x, y]
  }





  useLayoutEffect(() => {
    if (!dimensions) {
      return
    }

    const svg = select(svgRef.current)

    const defs = svg.append("defs")
    const clip = defs.append("clipPath")
      .attr("id", "allow-inside")
      // .attr("clipPathUnits", "objectBoundingBox")
      .attr("transform", `translate(${-mainCircleX}, ${-(height / 2)})`)
      .attr("clipPathUnits", "userSpaceOnUse")

    const mask = defs.append("mask")
      .attr("id", "allow-outside")
    // .attr("maskUnits", "objectBoundingBox")
    // .attr("maskContentUnits", "objectBoundingBox")
    // .attr("transform", `translate(${-mainCircleX}, ${-(height / 2)})`)
    // .attr("maskUnits", "userSpaceOnUse")

    clip.append("circle")
      .attr("cx", mainCircleX)
      .attr("cy", height / 2)
      .attr("r", p_radius - 5)
      .attr("fill", "white")
      .attr("stroke", "red")

    mask.append("rect")
      .attr("x", -mainCircleX)
      .attr("y", -height / 2)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "white")

    mask.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", p_radius + 5)
      .attr("fill", "black")

    const mainGroup = svg.append("g")
      .attr("id", "mainGroup")
      .attr("transform", `translate(${mainCircleX}, ${height / 2})`)

    const outsideGroup = mainGroup.append("g")
      .attr("id", "outsideGroup")
      .attr("mask", "url(#allow-outside)")

    const insideGroup = mainGroup.append("g")
      .attr("id", "insideGroup")
      .attr("clip-path", "url(#allow-inside)")

    mainGroup.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", p_radius)
      .attr("fill", "none")
      .attr("fill-opacity", 0)
      .attr("stroke-width", 3)
      .attr("class", 'stroke-desaturated-grey')

    mainGroup.selectAll("outside-text")
      .data(items)
      .enter()
      .append("g")
      .attr("id", (d, i) => "outside-text-" + i)
      .attr("transform", (d, i) => `translate(${genCoordinates(d.d, p_radius + 13)[0]}, ${-genCoordinates(d.d, p_radius + 13)[1]})`)

    mainGroup.selectAll("inside-text")
      .data(items)
      .enter()
      .append("g")
      .attr("id", (d, i) => "inside-text-" + i)
      .attr("transform", (d, i) => `translate(${genCoordinates(d.d, p_radius - 18)[0]}, ${-genCoordinates(d.d, p_radius - 18)[1]})`)

    outsideGroup.selectAll("g")
      .data(items)
      .enter()
      .append("g")
      .attr("id", (d, i) => "outside-group-" + i)
      .attr("transform", (d, i) => `translate(${genCoordinates(d.d, p_radius)[0]}, ${-genCoordinates(d.d, p_radius)[1]})`)

    insideGroup.selectAll("g")
      .data(items)
      .enter()
      .append("g")
      .attr("id", (d, i) => "inside-group-" + i)
      .attr("transform", (d, i) => `translate(${genCoordinates(d.d, p_radius)[0]}, ${-genCoordinates(d.d, p_radius)[1]})`)

    const legendGroup = svg.append("g")
      .attr("id", "legendGroup")
      .attr("transform", `translate(${width / 10 * 7.5}, ${height / 4})`)

    const overAll = legendGroup.selectAll("*")
      .data(overAllItems)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${0}, ${i * width / 12})`)
      .on("mouseover", (_, d) => {
        selectItem(d.name, d.color)
      })
      .on("mouseout", (_, d) => {
        selectItem2(d.name, d.color)
      })

    overAll.append("circle")
      .attr("id", (d) => `key-${d.name}`)
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", width / 30)
      .attr("fill", "none")
      .attr("class", (d) => `stroke-${d.color}`)
      .attr("stroke-width", 3)

    overAll.append("text")
      .attr("id", (d) => `text-${d.name}`)
      .attr("x", 0)
      .attr("y", 5)
      .attr("text-anchor", "middle")
      .text((d) => d.value)

    overAll.append("text")
      .attr("x", 30)
      .attr("y", 5)
      .text((d) => d.name)


    select("Fire-inside")
      .on("mouseover", (d) => {
        console.log(d);

        selectItem("Fire-inside", "green-500")
      })
      .on("mouseout", (d) => {
        selectItem2("Fire-inside", 'transparent')
      })

    return () => {
      svg.select("#mainGroup").remove()
      svg.select("#insideGroup").remove()
      svg.select("#outsideGroup").remove()
      svg.select("#legendGroup").remove()
      svg.selectAll('defs').remove()
    };
  }, [dimensions])

  return (
    <div
      ref={wrapperRef}
      className={`max-w-lg`}
    >
      <svg ref={svgRef} width={width} height={height} className=''>
        <FireElements svgRef={svgRef.current} dimensions={dimensions} appendToSelector={"#outside-group-0"} />
        <FireElements svgRef={svgRef.current} dimensions={dimensions} appendToSelector={"#inside-group-0"} />
        {[1, 2, 3, 4].map((d) => {
          return <BasicCircleElements key={d} svgRef={svgRef.current} dimensions={dimensions} appendToSelector={`#inside-group-${d}`} />
        })}
        {[1, 2, 3, 4].map((d) => {
          return <BasicCircleElements key={d} svgRef={svgRef.current} dimensions={dimensions} appendToSelector={`#outside-group-${d}`} />
        })}
        {[1, 2, 3, 4].map((d) => {
          return <BasicTextElements key={d} svgRef={svgRef.current} dimensions={dimensions} appendToSelector={`#outside-text-${d}`} />
        })}
        {[1, 2, 3, 4].map((d) => {
          return <BasicTextElements key={d} svgRef={svgRef.current} dimensions={dimensions} appendToSelector={`#inside-text-${d}`} />
        })}
      </svg>
    </div>
  )
}
