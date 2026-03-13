import { arc, DefaultArcObject, Pie, pie, pointRadial, range, scaleLinear, select } from 'd3'
import React, { useEffect, useRef } from 'react'
import { useResizeObserver } from '../../Hooks/useResizeObserver'

type TSegment = {
  name: string
  size: number
  color: string
}



// const domain = [0, 100]

// const value = 50

type DialProps = {
  domain?: [number, number]
  value: number,
  expanded: boolean
  segmentsArray?: TSegment[]
  reverseSegments?: boolean
}

export const Dial = ({ domain = [0, 100], value, expanded = false, segmentsArray, reverseSegments = false }: DialProps) => {

  const segments = !segmentsArray ? [
    {
      name: "Very Low",
      size: 45,
      color: "fill-primary-red"
    },
    {
      name: "Decreased",
      size: 25,
      color: "fill-orange-500"
    },
    {
      name: "Moderate",
      size: 15,
      color: "fill-primary-yellow"
    },
    {
      name: "Optimal",
      size: 15,
      color: "fill-primary-green"
    },
  ] : segmentsArray


  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)

  const dimensions = useResizeObserver(wrapperRef)
  const margin = { top: 30, right: 30, bottom: 30, left: 30 }
  const width = dimensions?.width || 400 - margin.left - margin.right
  const height = width / 24 * 9 + margin.top + margin.bottom
  const baseRadius = width / 24 * 9 - margin.left

  const pieGenerator =
    // reverseSegments ?
    // pie<TSegment>().value((d) => d.size).startAngle(90 * Math.PI / 180).endAngle(-90 * Math.PI / 180).padAngle(0.02).sort(null)
    // :
    pie<TSegment>().value((d) => d.size).startAngle(-90 * Math.PI / 180).endAngle(90 * Math.PI / 180).padAngle(0.02).sort(null)
  const pieValues = pieGenerator(segments)

  const domainReversed = domain[0] > domain[1] ? true : false

  const scaleRadius = scaleLinear()
    .domain(domain)
    .range(
      // !domainReversed ?
      [-90 * Math.PI / 180, 90 * Math.PI / 180]
      // : [90 * Math.PI / 180, -90 * Math.PI / 180]
    )

  const arcSegmentGen = arc()
    .innerRadius(baseRadius - 14)
    .outerRadius(baseRadius + (expanded ? 25 : 0))

  useEffect(() => {
    if (!dimensions) {
      return
    }
    const svg = select(svgRef.current)

    svg.append("defs")
      .append("marker")
      .attr("id", `pointer-${value}`)
      .attr("markerWidth", 24)
      .attr("markerHeight", 24)
      .attr("refX", 12)
      .attr("refY", 10)
      .attr("orient", (scaleRadius(value) * 180 / Math.PI))
      .attr("markerUnits", "userSpaceOnUse")
      .append("path")
      .attr("d", "M4.5 15.75l7.5-7.5 7.5 7.5")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("fill", "none")
      .attr("stroke-linecap", "round")
      .attr("class", `stroke-charcoal`)
    // .attr("stroke", "black")

    const mainGroup = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height - margin.bottom})`)

    mainGroup.selectAll("path")
      .data<any>(pieValues)
      .enter()
      .append("path")
      .attr("d", arcSegmentGen)
      .attr("fill", "transparent")
      .attr("class", (d: any, i: number) => (`${d.data.color} cursor-pointer transition-all duration-10`))
      .attr("stroke-width", 0)
      .attr("stroke-alignment", "center")

    mainGroup.selectAll("text")
      .data(pieValues)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${pointRadial((d.startAngle + d.endAngle) / 2, baseRadius + 4)[0]},${pointRadial((d.startAngle + d.endAngle) / 2, baseRadius + 4)[1]})`)
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("class", (d: any, i: number) => (`${expanded ? 'fill-white' : d.data.color} cursor-pointer transition-all duration-10`))
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .attr("transform", (d) => {
        return `rotate(${(d.startAngle + d.endAngle) / 2 * 180 / Math.PI})`
      })
      .text((d) => d.data.name)

    const pointerG = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height - margin.bottom})`)


    pointerG.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", () => pointRadial(scaleRadius(value), baseRadius - 5)[0])
      .attr("y2", () => pointRadial(scaleRadius(value), baseRadius - 5)[1])
      .attr("stroke-width", expanded ? 8 : 2)
      .attr("class", `stroke-charcoal`)
      .attr("marker-end", `url(#pointer-${value})`)

    pointerG.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 4)
      .attr("class", `fill-charcoal`)


    return () => {
      svg.selectAll("*").remove()
    }
  }, [dimensions, expanded, value])


  return (
    <div
      ref={wrapperRef}
      className={`flex`}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className=''>

      </svg>
    </div>
  )
}


