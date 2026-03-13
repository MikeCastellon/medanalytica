import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../../Hooks/useResizeObserver";

const ProgressBar = ({
  value = 75,
  maxValue = 100,
  width = 300,
  height = 20,
  animate = true,
  color = "#3b82f6",
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);
  const newWidth = dimensions?.width || width;

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG
    const svg = d3.select(svgRef.current);

    // Background bar
    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", newWidth)
      .attr("height", height)
      .attr("rx", height / 2)
      .attr("ry", height / 2)
      .attr("fill", "#e2e8f0");

    // Progress bar
    const progress = svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 0)
      .attr("height", height)
      .attr("rx", height / 2)
      .attr("ry", height / 2)
      .attr("fill", "#3b82f6");

    // Calculate the width based on the value
    const progressWidth = (value / maxValue) * newWidth;

    // Animate the progress bar
    progress
      .transition()
      .duration(animate ? 1000 : 0)
      .attr("width", progressWidth)
      .attr("fill", color);

    // Add text label
    svg
      .append("text")
      .attr("x", newWidth / 2)
      .attr("y", height / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("class", "font-medium")
      .text(`${Math.round(value)}%`);
  }, [value, maxValue, newWidth, height, animate]);

  return (
    <div ref={wrapperRef} className="">
      <svg
        ref={svgRef}
        width={newWidth}
        height={height}
        className="overflow-visible"
      />
    </div>
  );
};

export default ProgressBar;
