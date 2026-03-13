import { scaleBand, scaleLinear, scaleOrdinal, scaleThreshold, select } from 'd3'
import React, { useEffect, useRef } from 'react'
import { on } from 'stream'
import { useResizeObserver } from '../../Hooks/useResizeObserver'

type TObjects = {
  // selector: string
  name: string
  value: number
  label: string | null
}

type BarGraphProps = {
  object: { [key: string]: number }
  accessors: string[]
  labels?: string[]
  yScale: number[]
  valueRange: number[]
  colourRange: string[]
  expanded: boolean
  onBarClick?: (detail: TObjects) => void
}

export const BarGraph = ({ object, accessors, labels, yScale, valueRange, colourRange, expanded = true, onBarClick }: BarGraphProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)

  const dimensions = useResizeObserver(wrapperRef)
  const margin = { top: 50, right: 40, bottom: 50, left: 40 }
  const width = dimensions?.width || 350 - margin.left - margin.right
  const height = 250 //dimensions?.height || - margin.top - margin.bottom;

  const primaryStroke = 3
  const secondaryStroke = 2

  const orderedObject: TObjects[] = accessors.map((d, i) => ({
    name: d,
    value: object[d],
    label: labels ? labels[i] : null
  }))

  const selectColor = scaleThreshold<number, string>()
    .domain(valueRange)
    .range(colourRange)

  const bands = scaleBand<TObjects>()
    .domain(orderedObject)
    .range([0, width])
    .paddingInner(.7)
    .paddingOuter(0.5)
    .align(0.7)

  const scaleY = scaleLinear()
    .domain(yScale)
    .range([0, height])

  useEffect(() => {
    if (!dimensions) {
      return
    }

    const svg = select(svgRef.current)

    const g = svg.append("g")
      .attr("transform", `translate(${0},${margin.top})`)

    // Bars
    g.selectAll("rect")
      .data(orderedObject)
      .enter()
      .append("rect")
      .attr("x", (d) => bands.copy().paddingOuter() + (bands(d) ?? 0))
      .attr("y", (d) => height - scaleY(d.value))
      .attr("width", () => bands.bandwidth())
      .attr("height", (d) => scaleY(d.value))
      .attr("stroke-width", primaryStroke)
      .attr("class", (d) => ` stroke-${selectColor(d.value)} ${expanded ? `  fill-${selectColor(d.value)}` : `fill-transparent`} cursor-pointer`)
      .on("mouseover", function (_, d) {
        expanded ? null : select(this).attr("class", `fill-${selectColor(d.value)} stroke-${selectColor(d.value)} transition-all duration-20 cursor-pointer`)
      })
      .on("mouseout", function (_, d) {
        expanded ? null : select(this).attr("class", `stroke-${selectColor(d.value)} fill-transparent transition-all duration-20 cursor-pointer`)
      })
      .on("mousedown", (_, d) => {
        console.log(d);
        onBarClick ? onBarClick(d) : null
      })


    const textGroup = svg.append("g")
      .attr("transform", `translate(${0},${height + margin.top + 20})`)

    // X Axis Text
    textGroup.selectAll("text")
      .data(orderedObject)
      .enter()
      .append("text")
      .attr("x", (d) => bands.copy().paddingOuter() + (bands(d) ?? 0) + (bands.bandwidth() / 2))
      .attr("y", 15)
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .attr("class", "fill-primary-grey")
      .text((d) => labels ? d.label : d.name)

    const axisGroup = svg.append("g")
      .attr("transform", `translate(${0},${height + margin.top})`)

    // X Axist
    axisGroup
      .append("line")
      .attr("x1", bands.copy().paddingOuter() + margin.left / 2)
      .attr("y1", secondaryStroke)
      .attr("x2", width - bands.copy().paddingOuter())
      .attr("y2", secondaryStroke + primaryStroke / 2)
      .attr("class", "stroke-desaturated-grey")
      .attr("stroke-width", secondaryStroke)

    // Y Axis
    svg
      .append("line")
      .attr("x1", bands.copy().paddingOuter() + margin.left / 2)
      .attr("y1", margin.top - 10)
      .attr("x2", bands.copy().paddingOuter() + margin.left / 2)
      .attr("y2", margin.top + height + primaryStroke - secondaryStroke)
      .attr("class", "stroke-desaturated-grey")
      .attr("stroke-width", secondaryStroke)

    return () => {
      svg.selectAll("*").remove()
    }
  }, [dimensions, expanded, object])

  return (
    <div ref={wrapperRef} className={` `}>
      <svg
        ref={svgRef}
        width={'100%'}
        height={height + margin.bottom + margin.bottom}
        className='fill-blue'>
        {/* <rect className='fill-secondary-red stroke-secondary-red' /> */}
      </svg>
    </div>
  )
}
