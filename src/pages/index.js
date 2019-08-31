import React from "react"
import { useD3 } from "D3blackbox"
import * as D3 from "d3"

const getRandomData = () =>
  D3.range(20).map(() => ({ x: Math.random(), y: Math.random() }))
const Axis = ({ x, y, scale }) => {
  const ref = useD3(el => D3.select(el).call(D3.axisLeft(scale)))
}
export default () => {
  const data = getRandomData()
  const height = 400
  const width = 400
  const xScale = D3.scaleLinear()
    .domain([0, 1])
    .range([0, width])
  const yScale = D3.scaleLinear()
    .domain([0, 1])
    .range([0, height])
  return (
    <svg width={width} height={height}>
      {/* create a scatterplot of the actual data*/}
      {data.map(d => (
        <circle cx={xScale(d.x)} cy={yScale(d.y)} r={5} />
      ))}
    </svg>
  )
}
