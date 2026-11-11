import Image from 'next/image'

// Official artwork is 557.9 × 342.6 (stacked wordmark)
const RATIO = 557.9 / 342.6

interface LogoProps {
  /** Background the logo sits on in the light theme */
  surface: 'light' | 'dark'
  /** Rendered height in px; width follows the artwork's ratio */
  height: number
  priority?: boolean
  className?: string
}

export default function Logo({ surface, height, priority = false, className = '' }: LogoProps) {
  const width = Math.round(height * RATIO)
  // The dark theme flips every surface, so each spot carries both variants
  // and globals.css shows the one that suits the current theme.
  const [lightTheme, darkTheme] = surface === 'light'
    ? ['/assets/images/logo.svg', '/assets/images/logo-reversed.svg']
    : ['/assets/images/logo-reversed.svg', '/assets/images/logo.svg']

  return (
    <span className={`inline-flex shrink-0 ${className}`} style={{ width, height }}>
      <Image src={lightTheme} alt="Kuza Connect" width={width} height={height} priority={priority} className="logo-light-theme" />
      <Image src={darkTheme} alt="Kuza Connect" width={width} height={height} className="logo-dark-theme" />
    </span>
  )
}
