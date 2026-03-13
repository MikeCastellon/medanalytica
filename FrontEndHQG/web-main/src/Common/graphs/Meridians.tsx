import { arc, pie, pointRadial, scaleLinear, scaleOrdinal, scaleThreshold, select } from 'd3'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useResizeObserver } from '../../Hooks/useResizeObserver'

type MeridianObjectKeys = {
  bl: number
  gb: number
  ht: number
  ki: number
  li: number
  lu: number
  lv: number
  pc: number
  si: number
  sp: number
  st: number
  tw: number
}

type MeridianObject = {
  key: string
  value: number
  group: any
}

type MeridiansProps = {
  data: MeridianObjectKeys
  onSegmentClick?: (d: MeridianObject) => void,
  date: Date
}

export const Meridians = ({ data, onSegmentClick, date }: MeridiansProps) => {
  const hours = date.getHours()
  const minutes = date.getMinutes()

  const [timeHover, setTimeHover] = useState<boolean>(false)

  const clockDegreeArray = [...Array.from(Array(24).keys()).map((v, i) => {
    return (i) * 15
  })]

  const hourArray = [...Array.from(Array(24).keys()).map((v, i) => {
    return (i + 1)
  })]

  const meridianKeys = ['gb', 'lv', 'lu', 'li', 'st', 'sp', 'ht', 'si', 'bl', 'ki', 'pc', 'tw']

  const doshaTextPositions = [
    {
      angle: 0,
      name: "PITTA",
      color: "fill-primary-red",
      rotate: 0
    },
    {
      angle: 60 * Math.PI / 180,
      name: "VATA",
      color: "fill-primary-yellow",
      rotate: 60
    },
    {
      angle: 120 * Math.PI / 180,
      name: "KAPHA",
      color: "fill-primary-green",
      rotate: -60
    },
    {
      angle: 180 * Math.PI / 180,
      name: "PITTA",
      color: "fill-primary-red",
      rotate: 0
    },
    {
      angle: 240 * Math.PI / 180,
      name: "VATA",
      color: "fill-primary-yellow",
      rotate: 60
    },
    {
      angle: 300 * Math.PI / 180,
      name: "KAPHA",
      color: "fill-primary-green",
      rotate: -60
    },

  ]

  const legendData = [
    {
      title: ["Highly", "Deficient"],
      pos: 15,
      classes: "fill-primary-red"
    },
    {
      title: ["Moderate ", "Deficiency"],
      pos: 34,
      classes: "fill-primary-yellow"
    },
    {
      title: ["Normal", ""],
      pos: 50,
      classes: "fill-primary-green"
    },
    {
      title: ["Moderate ", "Stagnation"],
      pos: 66,
      classes: "fill-primary-blue"
    },
    {
      title: ["High", "Stagnation"],
      pos: 85,
      classes: "fill-primary-purple"
    }
  ]

  const doshasScale = scaleOrdinal()
    .domain(meridianKeys)
    .range(["PITTA", "PITTA", "VATA", "VATA", "KAPHA", "KAPHA"])

  const doshasFillColorScale = scaleOrdinal()
    .domain(["PITTA", "VATA", "KAPHA"])
    .range(["fill-primary-red", "fill-primary-yellow", "fill-primary-green"])

  const fillColorScale = scaleThreshold<number, string>()
    .domain([10, 21, 41, 61])
    .range(["fill-primary-red", "fill-primary-yellow", "fill-primary-green", "fill-primary-blue", "fill-primary-purple"])

  const strokeColorScale = scaleThreshold<number, string>()
    .domain([10, 21, 41, 61])
    .range(["stroke-primary-red", "stroke-primary-yellow", "stroke-primary-green", "stroke-primary-blue", "stroke-primary-p"])

  const scaleHours = scaleLinear()
    .domain([0, 23])
    .range([-15, 330])
    .clamp(true)

  const scaleMinutes = scaleLinear()
    .domain([0, 60])
    .range([0, 15])
    .clamp(true)




  const orderedData = meridianKeys.map((key) => ({
    key: key,
    value: data[key as keyof typeof data],
    group: doshasScale(key)
  }))

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)

  const dimensions = useResizeObserver(wrapperRef)
  const margin = { top: 50, right: 40, bottom: 50, left: 40 }
  const width = dimensions?.width || 500 //- margin.left - margin.right
  const height = dimensions?.width || 500 //- margin.left - margin.right
  const maxRadius = width / 3

  const scaleRadius = scaleLinear()
    .domain([0, 70])
    .range([width / 100 * 3, maxRadius - 25])
    .clamp(true)

  const legendScale = scaleLinear()
    .domain([0, 100])
    .range([0, width])

  const pieGenerator = pie<MeridianObject>().value((data) => 10).startAngle(-30 * Math.PI / 180)
  const pieValues = pieGenerator(orderedData)

  const arcGrid = arc<any>()
    .innerRadius(0)
    .outerRadius(maxRadius + 1)

  const arcNormal = arc<any>()
    .innerRadius(maxRadius)
    .outerRadius(maxRadius + 4)

  const arcValues = arc<any>()
    .innerRadius(0)

  useLayoutEffect(() => {
    if (!dimensions) {
      return
    }

    const svg = select(svgRef.current)

    const gGrid = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`)

    const gDoshas = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`)

    const gValues = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`)

    const meridianValuesGroup = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`)

    const clock = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`)

    const legend = svg.append("g")
      .attr("transform", `translate(0, ${510})`)

    gGrid.selectAll("path")
      .data(pieValues)
      .enter()
      .append("path")
      .attr("d", arcGrid)
      .attr("fill", "transparent")
      .attr("class", (d: any, i: number) => (`stroke-primary-grey cursor-pointer transition-all duration-10`))
      .attr("stroke-width", .2)
      .attr("stroke-alignment", "center")
      .on("mousedown", (_, d) => {
        onSegmentClick ? onSegmentClick(d.data) : null
      })

    gDoshas.selectAll("path")
      .data(pieValues)
      .enter()
      .append("path")
      .attr("d", arcNormal)
      .attr("fill", "transparent")
      .attr("class", (d: any, i: number) => (`${doshasFillColorScale(d.data.group)} cursor-pointer transition-all duration-10`))
      .attr("stroke-width", 0)
      .attr("stroke-alignment", "center")

    gValues.selectAll("path")
      .data(pieValues)
      .enter()
      .append("path")
      .attr("d", (d) => arcValues.outerRadius(scaleRadius(d.data.value))(d))
      .attr("fill", "transparent")
      .attr("class", (d: any, i: number) => (`${fillColorScale(d.data.value)} cursor-pointer transition-all duration-10`))
      .attr("stroke-width", 2)
      .attr("stroke-alignment", "inner")
      .on("mousedown", (_, d) => {
        onSegmentClick ? onSegmentClick(d.data) : null
      })

    meridianValuesGroup.selectAll("text")
      .data(pieValues)
      .enter()
      .append("text")
      .attr("x", (d) => (pointRadial(((d.startAngle + d.endAngle) / 2), maxRadius - 13)[0]))
      .attr("y", (d) => pointRadial(((d.startAngle + d.endAngle) / 2), maxRadius - 13)[1])
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("class", "uppercase text-sm fill-primary-grey")
      .text((d) => d.data.key)

    gDoshas.selectAll("text")
      .data(doshaTextPositions)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${pointRadial(d.angle, maxRadius + 13)[0]
        },${pointRadial(d.angle, maxRadius + 13)[1]
        })`)
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("class", (d) => `uppercase text-lg ${d.color}`)
      .text((d) => d.name)
      .attr("transform", (d) => ` rotate(${d.rotate})`)

    clock.selectAll(".pointer")
      .data([scaleHours(hours) + scaleMinutes(minutes)])
      .enter()
      // .append("g")
      // .attr("transform", "rotate()")
      .append("g")
      .attr("transform", (d) => `
      translate(${pointRadial(d * Math.PI / 180, maxRadius + 40)[0]},${pointRadial(d * Math.PI / 180, maxRadius + 40)[1]}) 
      `)
      .append("path")
      .attr("d", "M0 0 L-7 0 L0 12 L7 0 z")
      .attr("stroke", "grey")
      .attr("stroke-width", 2)
      .attr("fill", () => timeHover ? "grey" : "transparent")
      .attr("transform", (d) => `rotate(${(d - 90 * Math.PI / 180)})`)
      .on("mouseover", () => setTimeHover(true))
      .on("mouseout", () => setTimeHover(false))

    clock.selectAll(".currentTime")
      .data([scaleHours(hours) + scaleMinutes(minutes)])
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${pointRadial(d * Math.PI / 180, maxRadius + 58)[0]},${pointRadial(d * Math.PI / 180, maxRadius + 58)[1]})`)
      .append("text")
      .attr("y", 5)
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .attr("fill", "grey")
      .text((v, i) => timeHover ? (minutes > 20 && minutes < 40) ? `${hours}:${minutes}` : `` : `${hours}:${minutes}`)

    timeHover ?
      clock.selectAll(".clock")
        .data(clockDegreeArray)
        .enter()
        .append("g")
        .attr("transform", (d, i) => `
      translate(${pointRadial(d * Math.PI / 180, maxRadius + 55)[0]},${pointRadial(d * Math.PI / 180, maxRadius + 55)[1]}) 
      `)
        .append("text")
        .attr("y", 6)
        .attr("text-anchor", "middle")
        .attr("font-size", 12)
        .attr("fill", "grey")
        .text((v, i) => hourArray[i] < 10 ? `0${hourArray[i]}:00` : hourArray[i] === 24 ? `00:00` : `${hourArray[i]}:00`)
      : null

    legend.selectAll(".legend")
      .data(legendData)
      .enter()
      // .append("g")
      .append("circle")
      .attr("cx", (d) => legendScale(d.pos))
      .attr("cy", 0)
      .attr("r", 10)
      .attr("class", (d) => d.classes)
    // .attr("fill", "red")
    // .attr("stroke", "greed")

    // const text = legend.selectAll(".legend")
    //   .data(legendData)
    //   .enter()
    //   .append("text")
    //   .attr("text-anchor", "middle")
    //   .attr("x", (d) => legendScale(d.pos))
    //   .attr("y", 25)
    //   .attr("text")

    const textLineOne = legend.selectAll(".lineOne")
      .data(legendData)
      .enter()
      .append("text")
      .text((d) => d.title[0])
      .attr("x", (d) => legendScale(d.pos))
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .attr("font-size", 12)

    const textLineTwo = legend.selectAll(".LineTwo")
      .data(legendData)
      .enter()
      .append("text")
      .text((d) => d.title[1])
      .attr("x", (d) => legendScale(d.pos))
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .attr("font-size", 12)


    return () => {
      svg.selectAll("*").remove()
    }

  }, [dimensions, timeHover, data])
  return (
    <div
      ref={wrapperRef}
      className={`flex max-w-lg`}
    >
      <svg ref={svgRef} width={width} height={620} className=' '></svg>
    </div>
  )
}
