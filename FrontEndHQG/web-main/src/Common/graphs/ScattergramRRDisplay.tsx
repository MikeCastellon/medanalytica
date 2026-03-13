import { axisBottom, axisLeft, axisRight, max, min, scaleLinear, select } from 'd3';
import React, { memo, useEffect, useRef } from 'react';
import { VictoryAxis, VictoryChart, VictoryScatter } from 'victory';
import { useResizeObserver } from '../../Hooks/useResizeObserver';
// import { green5, red5, yellow5 } from '../utils/colors';

export type ScatterData = {
  x: number,
  y: number,
  color: string
}

type Polyline = {
  x: number,
  y: number
}

type ScattergramRRDisplayProps = {
  scatterData: ScatterData[]
}



const genPolyLine = (points: Polyline[], xScale: (v: number) => number, yScale: (v: number) => number): string => {
  return points.map((p) => {
    return `${xScale(p.x)}, ${yScale(p.y)}`
  }).join(" ")
}

const ScattergramRRDisplay = ({ scatterData }: ScattergramRRDisplayProps) => {

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)

  const dimensions = useResizeObserver(wrapperRef)
  const width = (dimensions?.width || 500)
  const margin = 35
  const canvasWithMargin = width - (margin * 2)

  let maxValue = (max(scatterData, (s) => s.x) || 1200) + 300
  let minValue = (min(scatterData, (s) => s.x) || 600) - 300
  minValue = minValue < 400 ? 400 : minValue

  const scaleX = scaleLinear()
    .domain([minValue || 600, maxValue || 1200])
    .range([margin, canvasWithMargin + margin])

  const bottomAxis = axisBottom(scaleX)

  const scaleY = scaleLinear()
    .domain([minValue || 600, maxValue || 1200])
    .range([canvasWithMargin + margin, margin])

  const leftAxis = axisLeft(scaleY)

  useEffect(() => {

    if (!dimensions) {
      return
    }

    const svg = select(svgRef.current)

    const leftAxisGroup = svg.append("g").attr("id", "left-axis")
      .attr("transform", `translate(${margin}, 0)`)
      .call(leftAxis)

    const bottomAxisGroup = svg.append("g")
      .attr("id", "bottom-axis")
      .attr("transform", `translate(0, ${canvasWithMargin + margin})`)
      .call(bottomAxis)

    svg.append("g")
      .append("polyline")
      .attr("points", genPolyLine(outsidePoly, scaleX, scaleY))
      .attr("fill", "yellow")
      .attr("opacity", 0.2)

    svg.append("g")
      .append("polyline")
      .attr("points", genPolyLine(insidePoly, scaleX, scaleY))
      .attr("fill", "green")
      .attr("opacity", 0.2)

    // svg.append("g")
    //   .append("ellipse")
    //   .attr("cx", scaleX(900))
    //   .attr("cy", scaleY(900))
    //   .attr("ry", scaleX(1100) - scaleX(1000))
    //   .attr("rx", scaleX(1100) - scaleX(850))
    //   .attr("transform", `rotate(-45 ${scaleX(900)}  ${scaleX(900)}) `)
    //   .attr("stroke", "var(--primary-yellow)")
    //   .attr("fill", "var(--primary-yellow)")
    //   .attr("opacity", 0.2)
    //   .attr('stroke-width', 2)

    // svg.append("g")
    //   .append("ellipse")
    //   .attr("cx", scaleX(900))
    //   .attr("cy", scaleY(900))
    //   .attr("transform", `rotate(-45 ${scaleX(900)}  ${scaleX(900)}) `)
    //   .attr("ry", scaleX(1100) - scaleX(1000) - 40)
    //   .attr("rx", scaleX(1100) - scaleX(850) - 70)
    //   .attr("stroke", "var(--primary-green)")
    //   .attr("fill", "var(--primary-green)")
    //   .attr("opacity", 0.2)
    //   .attr('stroke-width', 2)

    svg.append("g")
      .attr("id", "dost")
      .selectAll("circle")
      .data(scatterData)
      .enter()
      .append('circle')
      .attr("transform", `translate(-100%, -100%)`)
      .attr("fill", (d: any) => `${d.color}`)
      .attr("cx", (d) => scaleX(d.x))
      .attr("cy", (d) => scaleY(d.y))
      .attr("r", (d) => 2)


    return () => {
      svg.selectAll("*").remove()
    }

  }, [dimensions, scatterData])

  return (
    <div ref={wrapperRef} className='w-full'>
      <svg ref={svgRef} width={"100%"} height={width} viewBox={`0 0 ${width} ${width}`} className='' />
    </div>
  )
};

export default memo(ScattergramRRDisplay)


const outsidePoly: Polyline[] = [
  {
    x: 665,
    y: 665
  },
  {
    x: 665,
    y: 780
  },
  {
    x: 1000,
    y: 1120
  },
  {
    x: 1120,
    y: 1120
  },
  {
    x: 1120,
    y: 1000
  },
  {
    x: 780,
    y: 665
  },
  {
    x: 665,
    y: 665
  },
]

const insidePoly: Polyline[] = [
  {
    x: 740,
    y: 740
  },
  {
    x: 740,
    y: 790
  },
  {
    x: 990,
    y: 1040
  },
  {
    x: 1040,
    y: 1040
  },
  {
    x: 1040,
    y: 990
  },
  {
    x: 790,
    y: 740
  },
  {
    x: 740,
    y: 740
  },
]