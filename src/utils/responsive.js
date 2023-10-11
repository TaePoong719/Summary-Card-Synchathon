import { useMediaQuery } from 'react-responsive'

export const LargePC = () => {
  const isLargePc = useMediaQuery({
    query: '(min-width:1024px)',
  })

  return isLargePc
}

export const PC = () => {
  const isPc = useMediaQuery({
    query: '(min-width:768px) and (max-width: 1023px)',
  })

  return isPc
}

export const Tablet = () => {
  const isTablet = useMediaQuery({
    query: '(min-width: 480px) and (max-width:767px)',
  })

  return isTablet
}

export const Mobile = () => {
  const isMobile = useMediaQuery({
    query: '(min-width: 360px) and (max-width:479px)',
  })
  return isMobile
}

export const SmallMobile = () => {
  const isSmallMobile = useMediaQuery({
    query: '(max-width:359px)',
  })
  return isSmallMobile
}

export const LargePCMin = 1024
export const PCMin = 768
export const TabletMin = 480
export const MobileMin = 360
export const SmallMobileMax = 359
