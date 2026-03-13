import React from 'react'
import { useMediaQuery } from 'react-responsive'

export type ResponsiveMetadata = {
  isDesktopOrLaptop: boolean
  isBigScreen: boolean
  isTabletOrMobile: boolean
  isPortrait: boolean
  isRetina: boolean
}

// export const ResponsiveNavHOC = <P extends object>(OriginalComonent: React.ComponentType<P>) => {
//   const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
//   const isBigScreen = useMediaQuery({ minWidth: 1824 })
//   const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
//   const isPortrait = useMediaQuery({ orientation: 'portrait' })
//   const isRetina = useMediaQuery({ minResolution: '2dppx' })

//   const responsiveMetdata = {
//     isDesktopOrLaptop,
//     isBigScreen,
//     isTabletOrMobile,
//     isPortrait,
//     isRetina,
//   }

//   return () => (
//     <OriginalComonent {...props as P}/>
//   )
// }
