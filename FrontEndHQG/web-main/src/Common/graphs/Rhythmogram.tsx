import { useLayoutEffect, useRef } from 'react'
import { select, scaleLinear, line } from 'd3'
import { useResizeObserver } from '../../Hooks/useResizeObserver'

type rr_metadata = {
  x0: number,
  x1: number,
  xc: number,
  value: number,
  status: "NORMAL" | "ABOVE" | "BELOW",
  rejected: false
}

type RhythmogramProps = {
  data: rr_metadata[]
}

export const Rhythmogram = ({ data }: RhythmogramProps) => {

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)

  const dimensions = useResizeObserver(wrapperRef)
  const width = dimensions?.width || 1000

  const scaleX = scaleLinear()
    .domain([0, data.length])
    .range([0, width])

  const scaleY = scaleLinear()
    .domain([500, 1400])
    .range([200, 0])

  const heartLine = line()
    .x((value: any, index: any) => scaleX(index))
    .y((value: any) => scaleY(value.value))

  useLayoutEffect(() => {
    if (!dimensions) {
      return
    }

    const svg = select(svgRef.current)
    svg.attr("height", 200)

    svg.append("path")
      .datum(data)
      .attr("class", "stroke-primary-red")
      .attr("d", (value: any) => heartLine(value))
      // .attr("stroke", "tomato")
      .attr("fill", "none")

    // svg.selectAll("line")
    // .data([600, 800, 900, 1000, 1200])
    // .enter()
    // .append("line")
    // .attr("x1", 0)
    // .attr("y1", (d: any) => scaleY(d))
    // .attr("x2", width)
    // .attr("y2", (d: any) => scaleY(d))
    // .style("stroke-width", .2)
    // .style("stroke", "black")
    // .style("fill", "none");

    // svg.selectAll("text")
    //   .data([600, 800, 900, 1000, 1200])
    //   .enter()
    //   .append("text")
    //   .attr("x", () => 10)
    //   .attr("y", (d: any) => scaleY(d) - 5)
    //   .attr("font-size", 12)
    //   .attr("fill", "#666")
    //   .text((d: any) => d + " ms")

    return () => {
      svg.selectAll("path").remove()
      // svg.selectAll("line").remove()
    }

  }, [dimensions, data])

  // data.map((d: rr_metadata) => {
  //   console.log(d);

  //   console.log(heartLine(d))
  // });

  return (
    <div ref={wrapperRef} className='w-full'>
      {/* {data &&
        <path d={data.map((d: any) => heartLine(d)).toString()} className=' stroke-primary-blue' />
      } */}
      <svg ref={svgRef} width={"100%"} className=''>
        {[600, 800, 900, 1000, 1200].map(d => {
          return (
            <g key={d}>
              <text x={10} y={scaleY(d) - 5} fontSize={12} fill="#333">{d} ms</text>
              <line x1={0} x2={width} y1={scaleY(d)} y2={scaleY(d)} className='stroke-primary-grey' strokeWidth={0.2} />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
