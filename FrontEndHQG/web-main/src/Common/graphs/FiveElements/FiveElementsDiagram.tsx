import { arc, pie, pointRadial, scaleLinear } from 'd3';
import React, { useEffect, useRef } from 'react';

type ClickProps = {
  name: string
  shortName: string
  value: string | number
}

export const FiveElementsDiagram = ({ meridians, elementClick }: { meridians: any, elementClick?: (props: ClickProps) => void }) => {

  // const ref = useRef<any>()
  // const dimensions = useResizeObserver(ref)
  // const width = dimensions?.width ?? 380
  const width = 500
  const merdianData = meridians
  if (!merdianData) {
    return <div>No Data To Display</div>
  }
  const majorRadius = 150 //Dimensions.get('window').width / 3
  const maxBubbleSize = 70 //Dimensions.get('window').width / 6
  const minBubbleSize = 50 //Dimensions.get('window').width / 15
  const insideBubblesData = [
    // {
    //   name: "ht",
    //   angle: 0,
    //   color: theme.colors.mainRed,
    // },
    {
      name: "sp",
      angle: 72,
      color: "rgb(255, 179, 0)",
      fullName: "Spleen",
    },
    // {
    //   name: "pc",
    //   angle: 144,
    //   color: "orange",
    // },
    {
      name: "lu",
      angle: 144,
      color: "lightGrey",
      fullName: "Lungs",
    },
    {
      name: "ki",
      angle: 216,
      color: "steelBlue",
      fullName: "Kidney",
    },
    {
      name: "lv",
      angle: 288,
      color: "rgb(67, 160, 71)",
      fullName: "Liver",
    },
  ]
  const outsideBubblesData = [
    // {
    //   name: "si",
    //   angle: 0,
    //   color: theme.colors.mainRed,
    // },
    {
      name: "st",
      angle: 72,
      color: "rgb(255, 179, 0)",
      fullName: "Stomach",
      insidePair: "sp"
    },
    // {
    //   name: "tw",
    //   angle: 144,
    //   color: "orange",
    // },
    {
      name: "li",
      angle: 144,
      color: "lightGrey",
      fullName: "Large Intestine",
      insidePair: "lu"
    },
    {
      name: "bl",
      angle: 216,
      color: "steelBlue",
      fullName: "Bladder",
      insidePair: "ki"
    },
    {
      name: "gb",
      angle: 288,
      color: "rgb(67, 160, 71)",
      fullName: "Gal Bladder",
      insidePair: "lv"
    },
  ]

  // const mainCircleArrowLocations = [36, 108, 180, 252, 324]
  const mainCircleArrowLocations = [
    {
      degrees: 36,
      rotation: 130,
    },
    {
      degrees: 108,
      rotation: 198,
    },
    {
      degrees: 180,
      rotation: 270,
    },
    {
      degrees: 252,
      rotation: 350,
    },
    {
      degrees: 324,
      rotation: 60,
    },
  ]

  const mainBubbleName = ["Earth", "Metal", "Water", "Wood"]


  const bubbleScale = scaleLinear()
    .domain([0, 100])
    .range([minBubbleSize, maxBubbleSize])

  useEffect(() => {


  }, [meridians])


  return (
    <div
      style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
    // ref={ref}
    >

      <svg width={width} height={500}>
        <defs >

          <clipPath id="allow-inside">
            <circle
              cx={width / 2}
              cy={width / 2}
              r={majorRadius - 1.9}
              fill="white"
            />

          </clipPath>
          <mask id="allow-outside">
            <rect
              width={width}
              height={width}
              fill="white" />
            <circle
              cx={width / 2}
              cy={width / 2}
              r={majorRadius + 2.9}
              fill="black"
              stroke="white"
              strokeWidth="2"
            />
          </mask>

        </defs>

        <FireElementBubble width={width} minBubbleSize={minBubbleSize} maxBubbleSize={maxBubbleSize} merdianData={merdianData} elementClick={elementClick} />
        <circle
          cx={width / 2}
          cy={width / 2}
          r={majorRadius}
          stroke="#444"
          strokeWidth="4"
          fill="none"
        />
        {
          mainCircleArrowLocations.map((d: any, i: number) => {
            const coords = pointRadial(degreeToRadians(d.degrees), majorRadius - 1)
            return (
              <path
                key={i}
                x={coords[0] + width / 2 - 9}
                y={coords[1] + width / 2 - 12}
                transform={`translate(${coords[0] + width / 2 - 9}, ${coords[1] + width / 2 - 12}) scale(.18) rotate(${d.rotation}, 47,62.5) `}
                // d="M41 0L81.7032 92.25H0.296806L41 0Z"
                d="M41 0L81.7032 92.25H0.296806L41 0Z"
                fill="#1A2B34"
                strokeWidth={15}
              // stroke="white" 
              />
            )
          })
        }

        <ConnectionArrows majorRadius={majorRadius} />

        {
          // Bubbles on the outside of the main circle
          outsideBubblesData.map((d: any, index: number) => {
            const coords = pointRadial(degreeToRadians(d.angle), majorRadius)
            return (
              <circle
                key={index}
                cx={coords[0] + width / 2}
                cy={coords[1] + width / 2}
                r={bubbleScale(merdianData[d.name])}
                fill={d.color}
                mask="url(#allow-outside)"
                cursor="pointer"
                onClick={() => {
                  elementClick && elementClick({
                    name: d.fullName,
                    shortName: d.name,
                    value: meridians[d.name].toFixed(2),
                  })
                }}
              />
            )
          })
        }

        {
          // Bubbles on the inside of the Main Circle
          insideBubblesData.map((d: any, index: number) => {
            const coords = pointRadial(degreeToRadians(d.angle), majorRadius)
            return (
              <circle
                key={index}
                cx={coords[0] + width / 2}
                cy={coords[1] + width / 2}
                r={bubbleScale(merdianData[d.name])}
                fill={d.color}
                clipPath="url(#allow-inside)"
                cursor="pointer"
                onClick={() => {
                  elementClick && elementClick({
                    name: d.fullName,
                    shortName: d.name,
                    value: meridians[d.name].toFixed(2),
                  })
                }}
              />
            )
          })
        }

        {
          insideBubblesData.map((d: any, index: number) => {
            const coords = pointRadial(degreeToRadians(d.angle), majorRadius - 20)
            return (
              <text
                key={index}
                fill="#222"
                textAnchor="middle"
                cursor="pointer"
                onClick={() => {
                  elementClick && elementClick({
                    name: d.fullName,
                    shortName: d.name,
                    value: meridians[d.name].toFixed(2),
                  })
                }}
              >
                <tspan
                  x={coords[0] + width / 2}
                  y={coords[1] + width / 2}
                  dy="0">{d.name.toUpperCase()}</tspan>
                <tspan
                  x={coords[0] + width / 2}
                  y={coords[1] + width / 2}
                  dy="12">{merdianData[d.name].toFixed()}</tspan>
              </text>
            )
          })
        }


        {
          outsideBubblesData.map((d: any, index: number) => {
            const coords = pointRadial(degreeToRadians(d.angle), majorRadius + 17)
            return (
              <text
                key={index}
                fill="#222"
                textAnchor="middle"
                cursor="pointer"
                onClick={() => {
                  elementClick && elementClick({
                    name: d.fullName,
                    shortName: d.name,
                    value: meridians[d.name].toFixed(),
                  })
                }}
              >
                <tspan
                  x={coords[0] + width / 2}
                  y={coords[1] + width / 2}
                  dy="0">{d.name.toUpperCase()}</tspan>
                <tspan
                  x={coords[0] + width / 2}
                  y={coords[1] + width / 2}
                  dy="12">{merdianData[d.name].toFixed()}</tspan>
              </text>
            )
          })
        }
        {
          outsideBubblesData.map((d: any, index: number) => {
            const coords = pointRadial(degreeToRadians(d.angle), majorRadius + 60)
            return (
              <text
                key={index}
                fill="#222"
                textAnchor={(index === 0 || index === 1) ? "start" : "end"}
                cursor="pointer"
                onClick={() => {
                  elementClick && elementClick({
                    name: d.fullName,
                    shortName: d.name,
                    value: meridians[d.name].toFixed(),
                  })
                }}
              >
                <tspan
                  x={coords[0] + width / 2}
                  y={coords[1] + width / 2}
                  dy={(index === 0 || index === 3) ? "-25" : "30"}
                >{mainBubbleName[index]}</tspan>

              </text>
            )
          })
        }

        {
          outsideBubblesData.map((d: any, index: number) => {
            const coords = pointRadial(degreeToRadians(d.angle), majorRadius + 55)
            return (
              <g key={index}>
                <circle
                  cx={coords[0] + width / 2}
                  cy={coords[1] + width / 2}
                  fill="white"
                  stroke={d.color}
                  r="20" />
                <text
                  key={index}
                  fill="#222"
                  textAnchor="middle"
                  cursor="pointer"
                  onClick={() => {
                    elementClick && elementClick({
                      name: d.fullName,
                      shortName: d.name,
                      value: meridians[d.name].toFixed(),
                    })
                  }}
                >
                  <tspan
                    x={coords[0] + width / 2}
                    y={coords[1] + width / 2}
                    dy="5"
                  >
                    {(merdianData[d.name] + merdianData[d.insidePair]).toFixed()}%</tspan>
                </text>
              </g>
            )
          })
        }

        {/* <Line x1={20} x2={150} y1={10} y2={10} strokeWidth={2} stroke="white" markerEnd="url(#triangle)" />
      <Path d="M 10 20 L 200 20" strokeWidth="2" stroke="white" markerEnd="url(#triangle)" /> */}
      </svg>

    </div>
  )
}

const degreeToRadians = (degree: number) => {
  return degree * Math.PI / 180
}

const FireElementBubble = (props: any) => {


  const labelRadius = 22
  const pieSizes = [
    {
      pieSize: 25,
      pieRadius: props.merdianData.tw || 0,
      label: "TW",
      labelAngle: 45,
      fullName: "Triple Warmer",
    },
    {
      pieSize: 25,
      pieRadius: props.merdianData.pc || 0,
      label: "PC",
      labelAngle: 135,
      fullName: "Pericardium",
    },
    {
      pieSize: 25,
      pieRadius: props.merdianData.ht || 0,
      label: "HT",
      labelAngle: 225,
      fullName: "Heart",
    },
    {
      pieSize: 25,
      pieRadius: props.merdianData.si || 0,
      label: "SI",
      labelAngle: 315,
      fullName: "Small Intestine",
    },
  ]
  const bubbleScale = scaleLinear()
    .domain([0, 100])
    .range([props.minBubbleSize, props.maxBubbleSize])
    .clamp(true)

  const pieArc = arc()
    .innerRadius(2)
    .outerRadius((d: any) => {
      return bubbleScale(d.data.pieRadius)
    });

  const pieCalc = pie<any>()
    .padAngle(.05)
    .value(function (d: any) { return d.pieSize; })

  const pieData = pieCalc(pieSizes)

  const arcsData = pieData.map((d: any) => {
    return {
      ...d,
      path: pieArc(d)
    }
  })

  useEffect(() => {

  }, [props.merdianData])

  return (
    <g transform={`translate(${500 / 2},100)`} >

      {
        arcsData.map((d, i) => {
          const labelCoords = pointRadial(degreeToRadians(d.data.labelAngle), labelRadius)
          return (
            <g key={i}
              cursor="pointer"
              onClick={() => {
                props.elementClick({
                  name: d.data.fullName,
                  shortName: d.data.label.toLocaleLowerCase(),
                  value: d.value,
                })
              }}
            >
              <path
                key={`${i}-path`}

                d={d.path}
                fill={"rgb(229, 57, 53)"} />
              <text
                key={`${i}-text`}
                fill="black"
                fontSize="12"
                textAnchor="middle"

              >
                <tspan
                  dy="0"
                  x={labelCoords[0]}
                  y={labelCoords[1]}
                >
                  {d.data.label}
                </tspan>
                <tspan
                  dy="12"
                  x={labelCoords[0]}
                  y={labelCoords[1]}
                >
                  {d.data.pieRadius.toFixed()}
                </tspan>
              </text>
            </g>
          )
        })
      }
      <g>
        <circle
          cx={-40}
          cy={-50}
          fill="white"
          stroke={"red"}
          r="20" />
        <text>
          <tspan
            textAnchor="middle"
            dy="5"
            x={-40}
            y={-85}
          >Fire</tspan>
          <tspan
            textAnchor="middle"
            dy="5"
            x={-40}
            y={-50}
          >{(props?.merdianData['si'] + props?.merdianData['ht']).toFixed()}%</tspan>
        </text>
      </g>

      <g>
        <circle
          cx={40}
          cy={-50}
          fill="white"
          stroke={"red"}
          r="20" />
        <text>
          <tspan
            textAnchor="middle"
            dy="5"
            x={40}
            y={-85}
          >Fire Minister</tspan>
          <tspan
            textAnchor="middle"
            dy="5"
            x={40}
            y={-50}
          >{(props?.merdianData['tw'] + props?.merdianData['pc']).toFixed()}%</tspan>
        </text>
      </g>
    </g>

  )
}

const ConnectionArrows = (props: any) => {
  const majorRadius = props.majorRadius

  // const ref = useRef<any>()
  // const dimensions = useResizeObserver(ref)
  const width = 500

  const coords1 = [0, 72, 144, 216, 288]
  const coords2 = [144, 216, 288, 0, 72]

  return (
    <g
    // ref={ref}
    >
      <defs>
        <marker
          id="Triangle"
          viewBox="0 0 10 10"
          refX="0"
          refY="5"
          markerWidth="3"
          markerHeight="3"
          orient="auto"
        >
          <path
            d="M 10 5 L 0 10 L 0 0 z"
            fill="#1A2B34" strokeWidth="2" />
        </marker>
      </defs>
      <g transform={`translate(${width / 2},${width / 2})`}>
        {
          coords1.map((d: any, i: number) => {
            const startCoords = pointRadial(degreeToRadians(d), majorRadius - 85)
            const endCoords = pointRadial(degreeToRadians(coords2[i]), majorRadius - 75)
            return (
              <path
                key={i}
                d={`M${startCoords[0]} ${startCoords[1]} L${endCoords[0]} ${endCoords[1]}`}
                stroke="#1A2B34" strokeWidth="2"
                markerEnd="url(#Triangle)"
                opacity={.5}
              />
            )
          })
        }
      </g>

    </g>
  )
}