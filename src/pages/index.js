import React, { useState, useEffect } from "react"
import { useD3 } from "D3blackbox"
import * as D3 from "d3"

const getRandomData = () =>
  D3.range(20).map(() => ({ x: Math.random(), y: Math.random() }))
//D3.range(a) an array of a values
const Axis = ({ x, y, scale, axisType, ticks = 10 }) => {
  const fnName = axisType === "left" ? "axisLeft" : "axisBottom"

  const ref = useD3(el => D3.select(el).call(D3[fnName](scale).ticks(ticks)))
  return <g transform={`translate(${x},${y})`} ref={ref} />
}

const Datapoint = ({ cx, cy, r }) => {
  const [degrees, setDegrees] = useState(0)
  const data = getRandomData()
  const height = r
  const width = r
  const xScale = D3.scaleLinear()
    .domain([0, 1]) //domain take input
    .range([45, width]) //range of output
  const yScale = D3.scaleLinear()
    .domain([0, 1])
    .range([height - 45, 5]) //Convert yAxis to upside down  from 0 to 1
  // .range([5, height - 5])
  useEffect(() => {
    D3.selection() //D3.selection( function)
      .transition(`spinner-${cx}${cy}`)
      .tween("spinning", () => {
        const interpolate = D3.interpolate(0, 360)
        return t => setDegrees(Math.round(interpolate(t)))
      })

      .duration(20000)
      .ease(D3.easeBounceOut)
      .delay(500 * Math.random())
      .style("fill", "red")
  }, [])
  return (
    <g transform={`translate(${cx},${cy}) rotate(${degrees})`}>
      {/* create a scatterplot of the actual data*/}
      {data.map(d => (
        <circle cx={xScale(d.x)} cy={yScale(d.y)} r={1} />
      ))}
    </g>
  )
}

export default () => {
  const data = getRandomData()
  const height = 400
  const width = 400
  const xScale = D3.scaleLinear()
    .domain([0, 1]) //domain take input
    .range([45, width]) //range of output
  const yScale = D3.scaleLinear()
    .domain([0, 1])
    .range([height - 45, 5]) //Convert yAxis to upside down  from 0 to 1
  // .range([5, height - 5])

  return (
    <svg width={width} height={height}>
      {/* create a scatterplot of the actual data*/}
      {data.map(d => (
        <Datapoint cx={xScale(d.x)} cy={yScale(d.y)} r={5} />
      ))}
      <Axis x={40} y={0} scale={yScale} axisType="left" />
      <Axis x={0} y={height - 40} scale={xScale} axisType="bottom" />
    </svg>
  )
}
