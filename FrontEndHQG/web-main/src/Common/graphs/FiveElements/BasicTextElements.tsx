import { select, svg } from 'd3'
import React, { useEffect } from 'react'

type FireElementsType = {
  appendToSelector: string
  svgRef: SVGSVGElement | null,
  dimensions: any
}

export const BasicTextElements = ({ svgRef, dimensions, appendToSelector }: FireElementsType) => {

  useEffect(() => {
    if (!svgRef) {
      return
    }
    const svg = select(svgRef)

    const g = svg.select(appendToSelector)

    // const g = elg.append("g")
    //   .attr("id", "fire-g")

    // g.append("circle")
    //   .attr("id", "fire")
    //   .attr("cx", 0)
    //   .attr("cy", 0)
    //   .attr("r", dimensions.width / 4 / 3)
    //   .attr("fill-opacity", 0)
    //   .attr("stroke", "blue")
    //   .attr("stroke-width", 4)
    //   .on("mouseover", function (_, d) {
    //     console.log(d);
    //     select(this).style('stroke-width', 10)
    //   })
    //   .on("mouseout", function () {
    //     select(this).style('stroke-width', 2)
    //   })

    g.append("text")
      .attr("id", "text")
      .attr("x", 0)
      .attr("y", 10)
      .attr("text-anchor", "middle")
      .text("val")

    return () => {
      svg.selectAll("#text").remove()
      // svg.selectAll("#fire").remove()
      // svg.selectAll("#fire-text").remove()
    }
  }, [svgRef, dimensions])


  return (
    <>
    </>
  )
}
