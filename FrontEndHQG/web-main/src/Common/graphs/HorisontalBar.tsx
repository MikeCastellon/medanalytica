import { arc, DefaultArcObject, scaleLinear, select } from 'd3'
import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { useResizeObserver } from '../../Hooks/useResizeObserver'

type TStop = `${number}%`

export type GradientColors = {
  offset: TStop
  color: string
}

export type Marker = {
  pos: number
  text: string
}

type HorisontalBarProps = {
  refKey: string
  title: string
  value: number
  idealRange?: [number, number]
  absoluteRange: [number, number]
  gradientsColors: GradientColors[]
  markersInside?: Marker[]
  markersBottom?: Marker[]
  expanded?: boolean
  fixed?: number
}

export const HorisontalBar = ({ refKey, title, value, idealRange, absoluteRange, gradientsColors, expanded = false, markersInside, markersBottom, fixed = 1 }: HorisontalBarProps) => {

  const [hovering, setHovering] = useState<boolean>(false)

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)

  const dimensions = useResizeObserver(wrapperRef)
  // const margin = { top: 50, right: 30, bottom: 100, left: 40 }
  const paddingX = 30
  const width = dimensions?.width || 1000 - paddingX - paddingX
  const height = 70
  const markerHeight = 30

  const scaleX = scaleLinear().domain(absoluteRange).range([paddingX, width - (paddingX)]).clamp(true)
  const scaleInsideX = scaleLinear().domain(absoluteRange).range([paddingX + 10, width - (paddingX + 10)]).clamp(true)
  const markerWidth = scaleLinear().domain([0, 5]).range([markerHeight, 80]).clamp(true)

  const rightMarkerObj: DefaultArcObject = {
    innerRadius: 13,
    outerRadius: 15,
    startAngle: 150 * Math.PI / 180,
    endAngle: 30 * Math.PI / 180
  }

  const leftMarkerObj: DefaultArcObject = {
    innerRadius: 13,
    outerRadius: 15,
    startAngle: -150 * Math.PI / 180,
    endAngle: -30 * Math.PI / 180
  }

  const changeBar = (width: number) => {
    expanded ? null : select(`#bar-${refKey}`).style('stroke-width', width);
  }

  useLayoutEffect(() => {
    if (!dimensions) {
      return
    }

    const svg = select(svgRef.current)
      .on("mouseover", function () {
        expanded ? null : changeBar(15)
        setHovering(true)
      })
      .on("mouseout", function () {
        expanded ? null : changeBar(4)
        setHovering(false)
      })

    const defs = svg.append("defs").attr("fill", "green")

    const hoverGroup = svg.append("rect")
      .attr("fill", "transparent")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", dimensions?.width || 400)
      .attr("height", height)
    // defs.append("clipPath")

    const linearGradient = defs.append("linearGradient")
      .attr("id", "gradient-" + refKey)
      .attr("x1", paddingX * 2)
      .attr("y1", 0)
      .attr("x2", width - (paddingX * 2))
      .attr("y2", 70)
      .attr("gradientUnits", "userSpaceOnUse")

    gradientsColors.map((d) => {
      linearGradient.append("stop")
        .attr("stop-color", d.color)
        .attr("offset", d.offset)
    })

    const g = svg.append("g")
      .attr("transform", `translate(0, ${height / 2})`)

    markersInside ?
      svg.selectAll(".insideMarkers")
        .data<Marker>(markersInside)
        .enter()
        .append("text")
        .attr("x", (m) => scaleInsideX(m.pos))
        .attr("y", (height / 2) + 4)
        .attr("fill", () => hovering || expanded ? "white" : 'transparent')
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
        .attr("class", "transition-all duration-300")
        .text((m) => m.text)
      : null

    markersInside ?
      svg.selectAll(".dots")
        .data<Marker>(markersInside)
        .enter()
        .append("circle")
        .attr("cx", (m) => scaleInsideX(m.pos))
        .attr("cy", (height / 2))
        .attr("fill", () => hovering || expanded ? "transparent" : 'white')
        .attr("class", "transition-all duration-300")
        .attr("r", 1.5)

      : null

    markersBottom ?
      svg.selectAll(".markersBottom")
        .data<Marker>(markersBottom)
        .enter()
        .append("text")
        .attr("x", (m) => scaleInsideX(m.pos))
        .attr("y", 55)
        .attr("fill", () => "grey")
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
        // .attr("class", "transition-all duration-300")
        .text((m) => m.text)
      : null


    g.append("line")
      .attr("id", `bar-${refKey}`)
      .attr("x1", paddingX)
      .attr("y1", 0)
      .attr("x2", width - (paddingX))
      .attr("y2", 0)
      .attr("stroke-linecap", "round")
      .attr("stroke", `url(#gradient-${refKey})`)
      .attr("stroke-width", expanded ? 15 : 4)
      .attr("class", "transition-all duration-10")
      .on("mouseover", function (d) {
        // select(this).style('stroke-width', 15);
        // changeBar(15)
        // setHovering(true)

      })
      .on("mouseout", function (d) {
        // select(this).style('stroke-width', 4);
        // changeBar(4)
        // setHovering(false)

      })

    const mainMarkerGroup = svg.append("g")
      .attr("transform", `translate(${scaleX(value)}, ${height / 2})`)

    if (idealRange) {


      const leftMarkerG = svg.append("g")
        .attr("transform", `translate(${scaleX(idealRange[0]) + 14}, ${height / 2})`)

      const rightMarkerG = svg.append("g")
        .attr("transform", `translate(${scaleX(idealRange[1]) - 14}, ${height / 2})`)

      leftMarkerG.append("path")
        .attr("d", function (d) {
          return `${arc()(leftMarkerObj)}`
        })
        .attr("fill", "green")

      leftMarkerG.append("text")
        .attr("x", -10)
        .attr("y", 30)
        .attr("font-size", 12)
        .attr("fill", "#666")
        .attr("text-anchor", "middle")
        .text(idealRange[0])

      rightMarkerG.append("text")
        .attr("x", 10)
        .attr("y", 30)
        .attr("font-size", 12)
        .attr("fill", "#666")
        .attr("text-anchor", "middle")
        .text(idealRange[1])


      rightMarkerG.append("path")
        .attr("d", () => (`${arc()(rightMarkerObj)}`))
        .attr("fill", "green")
    }








    mainMarkerGroup.append("rect")
      .attr("x", - markerWidth(value?.toFixed().length - 1) / 2)
      .attr("y", -markerHeight / 2)
      .attr("height", markerHeight)
      .attr("width", markerWidth(value?.toFixed().length - 1))
      // .attr("fill", "white")
      .attr("stroke-width", 2)
      // .attr("stroke", "black")
      .attr("rx", 15)
      .attr("class", "fill-charcoal stroke-charcoal")

    mainMarkerGroup.append("text")
      .attr("x", 0)
      .attr("y", 5)
      .attr("text-anchor", "middle")
      // .attr("fill", "grey")
      .attr("class", "fill-white")
      .text(value?.toFixed(fixed))

    // mainMarkerGroup.append("circle")
    //   .attr("cx", 0)
    //   .attr("cy", 0)
    //   .attr("r", 5)




    return () => {
      svg.selectAll("*").remove()
    }
  }, [value, dimensions, gradientsColors, expanded, hovering])


  return (
    <div ref={wrapperRef} className={`mt-2 w-full `}>
      <div style={{
        marginLeft: paddingX,
        marginBottom: -20
      }} className="space-x-1">
        <span className="text-charcoal text-sm">{title}</span>
        {idealRange ?
          <>
            <span className='text-sm'>-</span>
            <span className='text-[10px] text-primary-grey'>{`(${idealRange[0]} - ${idealRange[1]})`}</span>
          </>
          : null
        }
      </div>
      <svg
        ref={svgRef}
        width={'100%'}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className=''></svg>
    </div>
  )
}
