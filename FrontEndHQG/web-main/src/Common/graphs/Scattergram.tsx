import { scaleLinear, select } from 'd3'
import React, { useEffect, useRef } from 'react'
import { useResizeObserver } from '../../Hooks/useResizeObserver'

export type ScatterData = {
  x: number,
  y: number,
  color: string
}

type ScattergramProps = {
  data: ScatterData[]
}

export const Scattergram = ({ data }: ScattergramProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)

  const dimensions = useResizeObserver(wrapperRef)
  const margin = { top: 50, right: 30, bottom: 50, left: 30 }
  const width = dimensions?.width || 800 - margin.left - margin.right
  const height = 400 //dimensions?.height || - margin.top - margin.bottom;

  const scaleX = scaleLinear()
    .domain([600, 1400])


  const scaleY = scaleLinear()
    .domain([600, 1400])
    .range([height - 5, 0])

  useEffect(() => {
    if (!dimensions) {
      return
    }
    scaleX.range([0, dimensions.width - 300])



    const svg = select(svgRef.current)

    svg.append("g")
      .attr("transform", `rotate(-45) translate(${scaleX(620)},${scaleY(650)})`)
      .append("ellipse")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("ry", scaleX(1100) - scaleX(1000))
      .attr("rx", scaleX(1100) - scaleX(850))
      .attr("fill", "transparent")
      .attr("stroke", "var(--primary-yellow)")
      .attr('stroke-width', 2)

    svg.append("g")
      .attr("transform", `rotate(-45) translate(${scaleX(600)},${scaleY(650)})`)
      .append("ellipse")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("ry", scaleX(1100) - scaleX(1000) - 40)
      .attr("rx", scaleX(1100) - scaleX(850) - 70)
      .attr("fill", "transparent")
      .attr("stroke", "var(--primary-green)")
      .attr('stroke-width', 2)

    const g = svg.append("g")
      .attr("transform", `translate(50, ${margin.top})`)

    g.selectAll("dots")
      .data(data)
      .enter()
      .append('circle')
      .attr("class", (d: any) => `fill-${d.color}`)
      .attr("cx", (d: any) => {
        return scaleX(d.x)
      })
      .attr("cy", (d: any) => scaleY(d.y))
      .attr("r", (d: any) => 2)

    svg.append("g")
      .attr("transform", `translate(30, 0)`)
      .selectAll("footer")
      .data([700, 900, 1100, 1300])
      .enter()
      .append("text")
      .attr("class", "fill-primary-grey text-sm")
      .attr("y", (d) => scaleY(d))
      .attr("text-anchor", "end")
      .text((d) => d)

    svg.append("g")
      .attr("transform", `translate(130, ${height + margin.top + 0})`)
      .selectAll("footer")
      .data([500, 700, 900, 1100, 1300])
      .enter()
      .append("text")
      .attr("class", "fill-primary-grey text-sm")
      .attr("x", (d) => scaleX(d))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .text((d) => d)

    svg.append("g")
      .attr("transform", `translate(30, 0)`)
      .append("line")
      .attr("x1", 15)
      .attr("y1", scaleY(1400))
      .attr("x2", 15)
      .attr("y2", scaleY(540))
      .attr("class", "stroke-desaturated-grey")
      .attr("stroke-width", 1)

    svg.append("g")
      .attr("transform", `translate(50, 0)`)
      .append("line")
      .attr("x1", -5)
      .attr("y1", scaleY(540))
      .attr("x2", scaleX(1400))
      .attr("y2", scaleY(540))
      .attr("class", "stroke-desaturated-grey")
      .attr("stroke-width", 1)



    return () => {
      svg.selectAll("*").remove()
    }


  }, [dimensions, data])

  return (
    <div ref={wrapperRef} className={` `}>
      <svg ref={svgRef} width={width} height={height + margin.bottom} className=' bg-opacity-25'>
      </svg>
    </div>
  )
}
