import { arc, pie, select } from "d3";
import React, { useEffect, useRef, useState } from "react";
import { useResizeObserver } from "../../Hooks/useResizeObserver";

type PieValue = {
  value: number;
  text: string;
  subtext: string;
  styleClass: string;
  onClick?: () => void;
};

type PieValuesProps = {
  data: PieValue[];
  filled: boolean;
  definedwidth?: number;
};

export const Pie = ({ data, filled = false, definedwidth }: PieValuesProps) => {
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  // const [filled, setFilled] = useState(true)
  // const filled = true

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const dimensions = useResizeObserver(wrapperRef);
  const margin = { top: 50, right: 30, bottom: 100, left: 40 };
  const width = dimensions?.width || 400 - margin.left - margin.right;
  const height = 400;

  let radia = [150, 150, 150, 150];

  const pieGenerator = pie<PieValue>()
    .value(({ value }) => value)
    .sort(null);
  const pieValues = pieGenerator(data);
  // console.log(pieValues);
  const arcNormal = arc<any>().innerRadius(10).outerRadius(150).padAngle(0.05);

  const arcOver = arc<any>().innerRadius(10).outerRadius(170).padAngle(0.05);

  const expandArc = (selector: string) => {
    select(`#${selector}`).attr("d", arcOver);
  };
  const contractArc = (selector: string) => {
    select(`#${selector}`).attr("d", arcNormal);
  };

  useEffect(() => {
    if (!dimensions) {
      return;
    }

    const svg = select(svgRef.current);

    const getCircleCoords = (angle: number, radius = 250) => {
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return [x, y];
    };

    const getMiddleAngle = (startAngle: number, endAngle: number) => {
      return (endAngle + startAngle) / 2;
    };

    const g1 = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    g1.selectAll("path")
      .data(pieValues)
      .enter()
      .append("path")
      .attr("id", (d) => d.data.text)
      .attr("d", arcNormal)
      // .attr("fill", "none")
      .attr(
        "class",
        (d: any, i: number) =>
          `${data[i].styleClass} cursor-pointer transition-all duration-10`
      )
      .attr("stroke-width", 4)
      .attr("fill", "black")
      .attr("fill-opacity", filled ? 1 : 0)
      .on("mousedown", (e, d) => (d.data.onClick ? d.data.onClick() : null))
      .on("mouseover", function (e, d) {
        // console.log(e);
        // console.log(d);
        // select(this).style('fill-opacity', filled ? 0 : 1);
        select(this).attr("d", arcOver);
      })
      .on("mouseout", function (d, i) {
        select(this).style("fill-opacity", filled ? 1 : 0);
        select(this).attr("d", arcNormal);
      });

    const g3 = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2}) rotate(-90)`);

    const pieRender = g3
      .selectAll("g")
      .data(pieValues)
      .enter()
      .append("g")
      .attr(
        "transform",
        (p, i) => `
        translate(
        ${
          getCircleCoords(
            getMiddleAngle(p.startAngle, p.endAngle),
            radia[i] / 2 + 20
          )[0]
        }, 
        ${
          getCircleCoords(
            getMiddleAngle(p.startAngle, p.endAngle),
            radia[i] / 2 + 20
          )[1]
        }) 
        rotate(90)`
      );

    pieRender
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", -20)
      .attr(
        "class",
        `${filled ? "fill-white" : "fill-primary-grey"} cursor-pointer`
      )
      .text((d, i) => {
        return `${d.data.text}`;
      })
      .on("click", (d) => {
        setHighlightIndex(d.index);
      });

    pieRender
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", -8)
      .attr(
        "class",
        `${filled ? "fill-white" : "fill-primary-grey"} cursor-pointer`
      )
      .attr("font-size", 14)
      .text((d, i) => {
        return `${d.data.subtext}`;
      })
      .on("click", (d) => {
        setHighlightIndex(d.index);
      });

    pieRender
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 12)
      .attr("font-size", 20)
      .attr(
        "class",
        (d: any, i: number) =>
          ` cursor-pointer ${filled ? "fill-white" : "fill-primary-grey"}`
      )
      .text((d, i) => {
        return `${d.data.value.toFixed()}%`;
      })
      .on("click", (d) => {
        setHighlightIndex(d.index);
      });

    // svg.append('circle')
    //   .attr("cx", 20)
    //   .attr("cy", 20)
    //   .attr("r", 10)
    //   .attr("class", `${filled ? 'fill-primary-green' : 'fill-transparent'} stroke-primary-green`)
    //   .attr('stroke-width', 3)
    //   // .on("mouseover", function (e, d) {
    //   //   // expandArc("VLF")
    //   //   setFilled(false)
    //   // })
    //   // .on("mouseout", function () {
    //   //   // contractArc("VLF")
    //   //   setFilled(true)
    //   // })
    //   .on("click", function () {
    //     // contractArc("VLF")
    //     // setFilled(!filled)
    //   })

    return () => {
      svg.selectAll("*").remove();
    };
  }, [data, dimensions, highlightIndex, filled]);

  return (
    <div ref={wrapperRef} className={` `}>
      <svg
        ref={svgRef}
        width={definedwidth || width}
        height={definedwidth || height}
        viewBox={`0 0 ${width} ${height}`}
        className=""
      ></svg>
    </div>
  );
};
