import { bin, scaleLinear, select, max, axisBottom, scaleBand } from 'd3'
import React, { useEffect, useRef } from 'react'
import { useResizeObserver } from '../../Hooks/useResizeObserver'

type Rrs = {
  value: number
}

type HistogramProps = {
  data: Rrs[]
}

type Bins = {
  data: number[][]
}

const genColorArray = (numberOfCol: number, classString: string) => {
  const colourArray = Array.from(Array(numberOfCol)).map(() => (classString))
  return colourArray
}

export const Histogram = ({ data }: HistogramProps) => {

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)

  const dimensions = useResizeObserver(wrapperRef)
  const margin = { top: 50, right: 30, bottom: 100, left: 40 }
  const width = dimensions?.width || 500 - margin.left - margin.right
  const height = 300 //dimensions?.height || - margin.top - margin.bottom;
  const footerColours = [
    ...genColorArray(4, "fill-primary-red"),
    ...genColorArray(8, "fill-primary-green"),
    ...genColorArray(4, "fill-primary-blue"),
  ]


  const scaleX = scaleLinear()
    .domain([400, 1400])
    .range([0, width])

  const scaleY = scaleLinear()
    .domain([0, 100])
    .range([0, height])

  const binsAmount = 16

  const histogramBins = bin()
    .domain([500, 1300])  // then the domain of the graphic
    .thresholds(16) // then the numbers of bins -> 1300 - 500 = 800 / 50ms


  const bins = histogramBins(data.map((d: any) => d.value))

  const bands = scaleBand<any>()
    .domain(bins)
    .range([0, width])
    .paddingInner(.5)
    .paddingOuter(2)
    .align(0.5)

  useEffect(() => {
    if (!dimensions) {
      return
    }

    const svg = select(svgRef.current)

    scaleY.domain([0, max(bins, function (d: any) { return d.length; })])

    const g = svg.append("g")
      .attr("transform", `translate(0, ${margin.top})`)

    // append the bar rectangles to the svg element
    g.selectAll("bars")
      .data(bins)
      .enter().append("rect")
      .attr("class", "fill-primary-grey")
      .attr("x", (d, i) => bands.copy().paddingOuter() + (bands(d) ?? 0))
      .attr("y", (d: any) => height - scaleY(d.length))
      .attr("width", function (d: any) { return bands.bandwidth() })
      .attr("height", function (d) { return scaleY(d.length) })
    // .attr("rx", 8)

    // g.selectAll("bars2")
    //   .data(bins)
    //   .enter().append("rect")
    //   .attr("class", "fill-primary-grey")
    //   .attr("x", (d, i) => bands.copy().paddingOuter() + (bands(d) ?? 0))
    //   .attr("y", (d: any) => height - 100)
    //   .attr("width", function (d: any) { return bands.bandwidth() })
    //   .attr("height", function (d) { return 100 })

    g.selectAll("rect-2")
      .data(bins)
      .enter()
      .append("rect")
      .attr("class", (d: any, i: number) => footerColours[i])
      .attr("x", (d: any) => scaleX(d.x0))
      .attr("y", (d: any) => height + 5)
      .attr("width", function (d: any) { return scaleX(d.x1) - scaleX(d.x0) + 1 })
      .attr("height", function (d) { return 5 });

    // svg.append("g")
    //   .attr("transform", `translate(0, ${height + margin.top + 20})`)
    //   .attr("stroke", "red")
    //   .call(axisBottom(scaleX)
    //     .tickValues([500, 700, 900, 1100, 1300])
    //     .tickSizeInner(0)
    //     .tickSizeOuter(0)
    //   )
    svg.append("g")
      .attr("transform", `translate(0, ${height + margin.top + 30})`)
      .selectAll("footer")
      .data([500, 700, 900, 1100, 1300])
      .enter()
      .append("text")
      .attr("class", "fill-primary-grey text-sm")
      .attr("x", (d) => scaleX(d))
      .attr("text-anchor", "middle")
      .text((d) => d)

    return () => {
      svg.selectAll("*").remove()
    }

  }, [dimensions, data])

  return (
    <>
      <div ref={wrapperRef} className={`w-full`}>
        <svg ref={svgRef} width={'100%'} height={height + margin.bottom} viewBox={`0 0 ${width} 500`} className=' bg-opacity-25'>
        </svg>
      </div>
    </>
  )
}
