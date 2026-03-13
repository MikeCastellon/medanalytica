import d3, { axisBottom, axisLeft, brushX, line, max, min, scaleLinear, select, zoom } from 'd3'
import React, { memo, useEffect, useRef, useState } from 'react'
import { useResizeObserver } from '../../Hooks/useResizeObserver'


// import './EcgViewer.css'

const EcgGraph = ({ data, rrData = [], filteredRR = [] }: any) => {
  // console.log(filteredRR);
  // console.log(rrData);

  const ref = useRef<any>()
  const svgRef = useRef<any>()
  const dimensions = useResizeObserver(ref)

  const svgHeight = 500
  const margins = { top: 30, right: 50, left: 50, bottom: 200 }
  const margins2 = { top: 350, right: 50, left: 50, bottom: 50 }
  const width = dimensions?.width ? dimensions?.width - margins.left - margins.right : 500
  const height = svgHeight - margins.top - margins.bottom
  const height2 = svgHeight - margins2.top - margins2.bottom

  const [showRR, setshowRR] = useState(false)

  const scaleX = scaleLinear()
    .domain([0, data.length])
    .range([0, width])

  const yMax = Number(max(data))
  const yMin = Number(min(data))

  const scaleY = scaleLinear()
    .domain([yMin, yMax])
    .range([height, 0])

  const scaleX2 = scaleLinear()
    .domain([0, data.length])
    .range([0, width])

  const scaleY2 = scaleLinear()
    .domain([Number(min(data)), Number(max(data))])
    .range([height2, 0])




  useEffect(() => {

    const svg = select(svgRef.current)
    // svg.attr("width", dimensions?.width ?? 1000)
    // svg.attr("height", svgHeight)


    const xAxis = axisBottom(scaleX)
    const xAxis2 = axisBottom(scaleX2)
    const yAxis = axisLeft(scaleY)

    var brush = brushX()
      .extent([[0, 0], [width, height2]])
      .on("end", (event) => {
        brushed(event)
      });

    // var zoomer = zoom()
    //   .scaleExtent([1, Infinity])
    //   .translateExtent([[0, 0], [width, height]])
    //   .extent([[0, 0], [width, height]])
    //   .on("zoom", (event) => console.log(event));

    var focus = svg.append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" + margins.left + "," + margins.top + ")")

    var context = svg.append("g")
      .attr("class", "context")
      .attr("transform", "translate(" + margins2.left + "," + margins2.top + ")");

    const heartLine = line()
      .x((value: any, index: any) => scaleX(index))
      .y((value: any, index: any) => scaleY(value))

    const heartLine2 = line()
      .x((value: any, index: any) => scaleX(index))
      .y((value: any, index: any) => scaleY2(value))


    const clip = svg.append("defs").append("clipPath")
      .attr("id", "clip")

    clip.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "black")

    // clip.append("rect")
    //   .attr("class", "zoom")
    //   .attr("width", width)
    //   .attr("height", height)
    //   .attr("transform", "translate(" + margins.left + "," + margins.top + ")")

    focus.append("path")
      .datum(data)
      .attr("class", "area stroke-primary-red")
      .attr("d", (value: any) => heartLine(value))
      // .attr("stroke", "green")
      .attr("fill", "none")
      .attr("stroke-width", 1)
      .attr("clip-path", "url(#clip)")

    focus.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    focus.append("g")
      .attr("class", "axis axis--y")
      .call(yAxis);

    context.append("path")
      .datum(data)
      .attr("class", "area stroke-primary-red")
      .attr("d", (value: any) => heartLine2(value))
      .attr("fill", "none")
      .attr("stroke-width", 0.3)

    context.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2)

    context.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, [scaleX((data.length / 2) - 2500), scaleX((data.length / 2) + 2500)]);


    function brushed(event: any) {
      if (event.sourceEvent && event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
      var s = event.selection || scaleX2.range();
      scaleX.domain(s.map(scaleX2.invert, scaleX2));

      focus.select(".area")
        .attr("d", (value: any) => heartLine(value));

      if (rrData) {
        focus
          .selectAll("line")
          .data(rrData)
          .join("line")
          .attr("class", "area")
          .attr("x1", (d: any) => scaleX(d.x))
          .attr("y1", 0)
          .attr("x2", (d: any) => scaleX(d.x))
          .attr("y2", height)
          .style("stroke-width", 1)
          .style("stroke", "grey")
          .style("fill", "none");
      }

      if (filteredRR) {
        focus
          .selectAll(".rr")
          .data(filteredRR)
          .join("line")
          .attr("class", "rr")
          .attr("x1", (d: any) => scaleX(d.x1))
          .attr("y1", 0)
          .attr("x2", (d: any) => scaleX(d.x1))
          .attr("y2", height)
          .style("stroke-width", 1)
          .style("stroke", (d: any) => d.rejected ? "red" : "green")
          .style("fill", "none")
          .attr("clip-path", "url(#clip)")

        focus
          .selectAll(".rrrange")
          .data(filteredRR)
          .join("line")
          .attr("class", "rrrange")
          .attr("x1", (d: any) => scaleX(d.x0 + 100))
          .attr("y1", () => scaleY(yMax) + 50)
          .attr("x2", (d: any) => scaleX(d.x1 - 100))
          .attr("y2", () => scaleY(yMax) + 50)
          .style("stroke-width", 1)
          .style("stroke", (d: any) => d.rejected ? "red" : "green")
          .style("fill", "none")
          .attr("clip-path", "url(#clip)")

        focus
          .selectAll(".intervaltext")
          .data(filteredRR)
          .join("text")
          .attr("class", "intervaltext")
          .attr("x", (d: any) => scaleX(d.xc))
          .attr("y", () => scaleY(yMax) + 40)
          .text((d: any) => d.value.toFixed())
          .style("text-anchor", "middle")
          .style("fill", (d: any) => d.rejected ? "red" : "green")
          .attr("clip-path", "url(#clip)")
      }
      // focus
      //   .selectAll("circle")
      //   .data(rrData)
      //   .join("circle")
      //   .attr("fill", "none")
      //   .attr("stroke", "steelblue")
      //   .attr("stroke-width", 1.5)
      //   .attr("class", "area")
      //   .attr("cx", (d: any) => scaleX(d.x))
      //   .attr("cy", (d: any) => scaleY(d.y * 2.4))
      //   .attr("r", 3);


      // focus.select(".axis--x")
      // .call(xAxis);
      // svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
      //   .scale(width / (s[1] - s[0]))
      //   .translate(-s[0], 0));
    }

    return () => {
      svg.selectAll(".rr").remove()
      svg.selectAll(".rrrange").remove()
      svg.selectAll(".intervaltext").remove()
      svg.selectAll("*").remove()
    }
  }, [data, rrData, filteredRR])

  return (
    <div ref={ref}>
      <svg ref={svgRef}
        width={width + margins.right + margins.left}
        height={height + 200}
      ></svg>
    </div>
  )
}

export default memo(EcgGraph)

