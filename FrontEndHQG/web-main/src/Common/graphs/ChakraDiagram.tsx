import { useDescriptionModal } from "../../Hooks/DescriptionModal";
import { BasicModalElement } from "../Modals/BasicModalElement";

export const ChakraDiagram = (props: any) => {
  const { setOpen } = useDescriptionModal();

  const width = 520;

  const details = props.data;

  return (
    <div
      style={{
        padding: 17,
        paddingTop: 20,
        marginTop: 30,
        marginBottom: 20,
        position: "relative",
        width: 470,
      }}
    >
      <svg
        width="337"
        height="700"
        viewBox="0 0 337 801"
        fill="black"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <mask id="path-1-inside-1_110_7" fill="white">
          <path d="M172.714 458.091C171.535 471.972 180.957 545.444 185.819 574.252C188.134 587.901 194.481 610.137 192.198 621.944C188.937 638.399 187.994 659.694 189.79 672.094C190.922 679.624 194.485 714.353 189.386 727.055C186.719 733.717 181.829 767.853 181.829 767.853C169.092 800.012 176.281 798.43 176.281 798.43C180.224 803.269 186.979 798.81 186.979 798.81C192.124 802.09 195.687 798.03 195.687 798.03C200.103 801.687 205.253 797.581 205.253 797.581C210.801 800.462 215.946 795.15 215.946 795.15C219.134 796.755 219.913 794.727 219.913 794.727C229.474 794.114 214.578 763.514 214.578 763.514C211.01 736.031 218.118 720.735 218.118 720.735C241.397 651.699 242.58 633.378 233.274 607.361C230.653 599.851 229.99 596.877 231.196 593.616C233.984 586.09 231.952 555.82 235.353 543.8C241.913 520.617 248.384 461.825 251.758 434.392C256.29 397.441 235.702 347.896 235.702 347.896C231.192 327.734 237.803 255.898 237.803 255.898C247.035 270.264 246.682 295.622 246.682 295.622C245.217 322.216 268.167 362.863 268.167 362.863C279.194 379.659 283.37 395.595 283.37 396.778C283.37 401.617 282.311 413.33 282.311 413.33L282.734 423.532C282.924 426.13 284.386 435.075 284.149 439.398C282.428 466.004 286.654 460.999 286.654 460.999C290.221 460.999 294.141 439.588 294.141 439.588C294.141 445.109 292.792 461.638 295.77 467.873C299.333 475.31 301.954 466.598 302 464.849C302.943 430.972 304.978 439.848 304.978 439.848C306.96 467.33 309.395 473.538 313.76 471.39C317.068 469.812 314.044 438.409 314.044 438.409C319.708 457.063 324.004 460.033 324.004 460.033C333.353 466.598 327.572 448.467 326.273 444.877C319.356 425.8 319.142 419.189 319.142 419.189C327.785 436.331 334.299 435.695 334.299 435.695C342.728 433.004 326.932 408.732 317.677 397.104C312.954 391.179 306.863 383.246 305.095 378.535C302.214 370.555 300.039 344.903 300.039 344.903C299.166 314.632 291.683 301.484 291.683 301.484C278.888 281.004 276.48 242.8 276.48 242.8L275.914 178.3C271.427 134.304 239.009 133.986 239.009 133.986C206.241 129.108 201.682 118.523 201.682 118.523C194.741 108.535 198.708 89.3887 198.708 89.3887C204.466 84.7048 206.687 72.2701 206.687 72.2701C216.249 64.938 215.78 54.2094 211.363 54.3257C207.819 54.4187 208.622 51.4836 208.622 51.4836C214.601 3.18719 171.725 0.721191 171.725 0.721191H165.18C165.18 0.721191 122.285 3.18719 128.256 51.4719C128.256 51.4719 129.059 54.411 125.484 54.3141C121.079 54.1977 120.668 64.9264 130.195 72.2585C130.195 72.2585 132.413 84.6893 138.174 89.377C138.174 89.377 142.141 108.523 135.2 118.511C135.2 118.511 130.656 129.097 97.873 133.974C97.873 133.974 65.4001 134.292 60.9838 178.289L60.3712 242.789C60.3712 242.789 58.0099 280.992 45.1642 301.472C45.1642 301.472 37.7158 314.624 36.855 344.891C36.855 344.891 34.6721 370.544 31.8028 378.523C30.0541 383.211 23.9667 391.144 19.2053 397.092C9.86862 408.697 -5.82306 432.919 2.57142 435.683C2.57142 435.683 9.12028 436.319 17.728 419.177C17.728 419.177 17.5497 425.742 10.6441 444.865C9.28701 448.409 3.51363 466.539 12.8658 460.022C12.8658 460.022 17.1968 457.048 22.8268 438.398C22.8268 438.398 19.8063 469.8 23.1679 471.378C27.561 473.53 29.9572 467.319 31.9385 439.836C31.9385 439.836 33.9703 430.961 34.9125 464.837C34.959 466.586 37.5219 475.298 41.1007 467.862C44.1212 461.627 42.7641 445.125 42.7641 439.576C42.7641 439.576 46.6376 460.987 50.2591 460.987C50.2591 460.987 54.5203 465.993 52.7716 439.386C52.4885 435.04 54.0123 426.118 54.2023 423.52L54.6133 413.319C54.6133 413.319 53.5509 401.632 53.5509 396.766C53.5509 395.56 57.7307 379.648 68.7541 362.851C68.7541 362.851 91.6809 322.185 90.2036 295.61C90.2036 295.61 89.8857 270.252 99.1176 255.886C99.1176 255.886 105.67 327.718 101.231 347.884C101.231 347.884 80.6071 397.429 85.1553 434.381C88.5053 461.887 94.965 520.601 101.541 543.788C104.976 555.785 102.945 586.047 105.698 593.604C106.938 596.889 106.287 599.913 103.619 607.35C94.364 633.367 95.5427 651.691 118.822 720.724C118.822 720.724 125.988 736.02 122.366 763.503C122.366 763.503 107.493 794.103 117.019 794.715C117.019 794.715 117.764 796.743 120.986 795.138C120.986 795.138 126.131 800.45 131.691 797.569C131.691 797.569 136.84 801.679 141.241 798.019C141.241 798.019 144.77 802.078 149.915 798.798C149.915 798.798 156.669 803.354 160.682 798.418C160.682 798.418 167.813 800 155.118 767.841C155.118 767.841 150.256 733.748 147.577 727.044C142.467 714.345 146.076 679.542 147.166 672.082C148.922 659.613 147.98 638.368 144.77 621.932C142.42 610.153 148.783 587.912 151.132 574.241C155.96 545.459 165.42 471.983 164.238 458.079L168.146 459.452C170.946 459.459 172.714 458.091 172.714 458.091Z" />
        </mask> */}
        <path
          d="M172.714 458.091C171.535 471.972 180.957 545.444 185.819 574.252C188.134 587.901 194.481 610.137 192.198 621.944C188.937 638.399 187.994 659.694 189.79 672.094C190.922 679.624 194.485 714.353 189.386 727.055C186.719 733.717 181.829 767.853 181.829 767.853C169.092 800.012 176.281 798.43 176.281 798.43C180.224 803.269 186.979 798.81 186.979 798.81C192.124 802.09 195.687 798.03 195.687 798.03C200.103 801.687 205.253 797.581 205.253 797.581C210.801 800.462 215.946 795.15 215.946 795.15C219.134 796.755 219.913 794.727 219.913 794.727C229.474 794.114 214.578 763.514 214.578 763.514C211.01 736.031 218.118 720.735 218.118 720.735C241.397 651.699 242.58 633.378 233.274 607.361C230.653 599.851 229.99 596.877 231.196 593.616C233.984 586.09 231.952 555.82 235.353 543.8C241.913 520.617 248.384 461.825 251.758 434.392C256.29 397.441 235.702 347.896 235.702 347.896C231.192 327.734 237.803 255.898 237.803 255.898C247.035 270.264 246.682 295.622 246.682 295.622C245.217 322.216 268.167 362.863 268.167 362.863C279.194 379.659 283.37 395.595 283.37 396.778C283.37 401.617 282.311 413.33 282.311 413.33L282.734 423.532C282.924 426.13 284.386 435.075 284.149 439.398C282.428 466.004 286.654 460.999 286.654 460.999C290.221 460.999 294.141 439.588 294.141 439.588C294.141 445.109 292.792 461.638 295.77 467.873C299.333 475.31 301.954 466.598 302 464.849C302.943 430.972 304.978 439.848 304.978 439.848C306.96 467.33 309.395 473.538 313.76 471.39C317.068 469.812 314.044 438.409 314.044 438.409C319.708 457.063 324.004 460.033 324.004 460.033C333.353 466.598 327.572 448.467 326.273 444.877C319.356 425.8 319.142 419.189 319.142 419.189C327.785 436.331 334.299 435.695 334.299 435.695C342.728 433.004 326.932 408.732 317.677 397.104C312.954 391.179 306.863 383.246 305.095 378.535C302.214 370.555 300.039 344.903 300.039 344.903C299.166 314.632 291.683 301.484 291.683 301.484C278.888 281.004 276.48 242.8 276.48 242.8L275.914 178.3C271.427 134.304 239.009 133.986 239.009 133.986C206.241 129.108 201.682 118.523 201.682 118.523C194.741 108.535 198.708 89.3887 198.708 89.3887C204.466 84.7048 206.687 72.2701 206.687 72.2701C216.249 64.938 215.78 54.2094 211.363 54.3257C207.819 54.4187 208.622 51.4836 208.622 51.4836C214.601 3.18719 171.725 0.721191 171.725 0.721191H165.18C165.18 0.721191 122.285 3.18719 128.256 51.4719C128.256 51.4719 129.059 54.411 125.484 54.3141C121.079 54.1977 120.668 64.9264 130.195 72.2585C130.195 72.2585 132.413 84.6893 138.174 89.377C138.174 89.377 142.141 108.523 135.2 118.511C135.2 118.511 130.656 129.097 97.873 133.974C97.873 133.974 65.4001 134.292 60.9838 178.289L60.3712 242.789C60.3712 242.789 58.0099 280.992 45.1642 301.472C45.1642 301.472 37.7158 314.624 36.855 344.891C36.855 344.891 34.6721 370.544 31.8028 378.523C30.0541 383.211 23.9667 391.144 19.2053 397.092C9.86862 408.697 -5.82306 432.919 2.57142 435.683C2.57142 435.683 9.12028 436.319 17.728 419.177C17.728 419.177 17.5497 425.742 10.6441 444.865C9.28701 448.409 3.51363 466.539 12.8658 460.022C12.8658 460.022 17.1968 457.048 22.8268 438.398C22.8268 438.398 19.8063 469.8 23.1679 471.378C27.561 473.53 29.9572 467.319 31.9385 439.836C31.9385 439.836 33.9703 430.961 34.9125 464.837C34.959 466.586 37.5219 475.298 41.1007 467.862C44.1212 461.627 42.7641 445.125 42.7641 439.576C42.7641 439.576 46.6376 460.987 50.2591 460.987C50.2591 460.987 54.5203 465.993 52.7716 439.386C52.4885 435.04 54.0123 426.118 54.2023 423.52L54.6133 413.319C54.6133 413.319 53.5509 401.632 53.5509 396.766C53.5509 395.56 57.7307 379.648 68.7541 362.851C68.7541 362.851 91.6809 322.185 90.2036 295.61C90.2036 295.61 89.8857 270.252 99.1176 255.886C99.1176 255.886 105.67 327.718 101.231 347.884C101.231 347.884 80.6071 397.429 85.1553 434.381C88.5053 461.887 94.965 520.601 101.541 543.788C104.976 555.785 102.945 586.047 105.698 593.604C106.938 596.889 106.287 599.913 103.619 607.35C94.364 633.367 95.5427 651.691 118.822 720.724C118.822 720.724 125.988 736.02 122.366 763.503C122.366 763.503 107.493 794.103 117.019 794.715C117.019 794.715 117.764 796.743 120.986 795.138C120.986 795.138 126.131 800.45 131.691 797.569C131.691 797.569 136.84 801.679 141.241 798.019C141.241 798.019 144.77 802.078 149.915 798.798C149.915 798.798 156.669 803.354 160.682 798.418C160.682 798.418 167.813 800 155.118 767.841C155.118 767.841 150.256 733.748 147.577 727.044C142.467 714.345 146.076 679.542 147.166 672.082C148.922 659.613 147.98 638.368 144.77 621.932C142.42 610.153 148.783 587.912 151.132 574.241C155.96 545.459 165.42 471.983 164.238 458.079L168.146 459.452C170.946 459.459 172.714 458.091 172.714 458.091Z"
          stroke="black"
          stroke-width="8"
          // mask="url(#path-1-inside-1_110_7)"
        />
      </svg>

      <div
        style={{
          backgroundColor: "black",
          position: "absolute",
          right: 0,
          top: 0,
          width: width / 2 + 55,
          height: width - 80,
          opacity: 0.5,
          flexDirection: "column",
        }}
      ></div>
      <div
        style={{
          // backgroundColor: theme.colors.mainBackground,
          position: "absolute",
          right: 0,
          top: 0,
          width: width / 2 + 55,
          height: width - 80,
          // opacity: 0.5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          onClick={() =>
            setOpen(
              <BasicModalElement title="Energy Plexus 7" descriptionKey="ep7" />
            )
          }
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: "#b260b2",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div style={{ color: "white" }}>EP 7</div>
            <div style={{ color: "white" }} className="font-bold">
              {details.chakras?.ep7?.toFixed() < 100
                ? details.chakras?.ep7?.toFixed()
                : 100}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div style={{ color: "white", fontSize: 17 }}>Crown Chakra</div>
            <div style={{ color: "white", fontSize: 13, fontStyle: "italic" }}>
              Sahasrara
            </div>
          </div>
        </div>

        <div
          onClick={() =>
            setOpen(
              <BasicModalElement title="Energy Plexus 6" descriptionKey="ep6" />
            )
          }
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: "#6060ba",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div style={{ color: "white" }}>EP 6</div>
            <div style={{ color: "white" }} className="font-bold">
              {details.chakras?.ep6?.toFixed() < 100
                ? details.chakras?.ep6?.toFixed()
                : 100}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div style={{ color: "white", fontSize: 17 }}>Third Eye Chakra</div>
            <div style={{ color: "white", fontSize: 13, fontStyle: "italic" }}>
              Ajna
            </div>
          </div>
        </div>

        <div
          onClick={() =>
            setOpen(
              <BasicModalElement title="Energy Plexus 5" descriptionKey="ep5" />
            )
          }
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: "#42b8d4",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div style={{ color: "white" }}>EP 5</div>
            <div style={{ color: "white" }} className="font-bold">
              {details.chakras?.ep5?.toFixed() < 100
                ? details.chakras?.ep5?.toFixed()
                : 100}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div style={{ color: "white", fontSize: 17 }}>Throat Chakra</div>
            <div style={{ color: "white", fontSize: 13, fontStyle: "italic" }}>
              Vishuddha
            </div>
          </div>
        </div>

        <div
          onClick={() =>
            setOpen(
              <BasicModalElement title="Energy Plexus 4" descriptionKey="ep4" />
            )
          }
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: "#6ec850",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div style={{ color: "white" }}>EP 4</div>
            <div style={{ color: "white" }} className="font-bold">
              {details.chakras?.ep4?.toFixed() < 100
                ? details.chakras?.ep4?.toFixed()
                : 100}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div style={{ color: "white", fontSize: 17 }}>Heart Chakra</div>
            <div style={{ color: "white", fontSize: 13, fontStyle: "italic" }}>
              Anahata
            </div>
          </div>
        </div>

        <div
          onClick={() =>
            setOpen(
              <BasicModalElement title="Energy Plexus 3" descriptionKey="ep3" />
            )
          }
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: "#ffa52c",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div style={{ color: "white" }}>EP 3</div>
            <div style={{ color: "white" }} className="font-bold">
              {details.chakras?.ep3?.toFixed() < 100
                ? details.chakras?.ep3?.toFixed()
                : 100}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div style={{ color: "white", fontSize: 17 }}>
              Solar Plexus Chakra
            </div>
            <div style={{ color: "white", fontSize: 13, fontStyle: "italic" }}>
              Manipura
            </div>
          </div>
        </div>

        <div
          onClick={() =>
            setOpen(
              <BasicModalElement title="Energy Plexus 2" descriptionKey="ep2" />
            )
          }
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: "#f37c3b",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div style={{ color: "white" }}>EP 2</div>
            <div style={{ color: "white" }} className="font-bold">
              {details.chakras?.ep2?.toFixed() < 100
                ? details.chakras?.ep2?.toFixed()
                : 100}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div style={{ color: "white", fontSize: 17 }}>Sacral Chakra</div>
            <div style={{ color: "white", fontSize: 13, fontStyle: "italic" }}>
              Svadhisthana
            </div>
          </div>
        </div>

        <div
          onClick={() =>
            setOpen(
              <BasicModalElement title="Energy Plexus 1" descriptionKey="ep1" />
            )
          }
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: "#e53c51",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div style={{ color: "white" }}>EP 1</div>
            <div style={{ color: "white" }} className="font-bold">
              {details.chakras?.ep1?.toFixed() < 100
                ? details.chakras?.ep1?.toFixed()
                : 100}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              width: width / 8,
            }}
          >
            <div style={{ color: "white", fontSize: 17 }}>Root Chakra</div>
            <div style={{ color: "white", fontSize: 13, fontStyle: "italic" }}>
              Muladhara
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
