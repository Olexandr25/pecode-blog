import PropTypes from 'prop-types'
import clsx from 'clsx'

const styles = {
  variants: {
    default: 'bg-white',
  },
  shapes: {
    default: 'rounded-xl',
  },
}

export default function Card({
  children,
  className,
  variant = 'default',
  shape = 'default',
}) {
  const classes = clsx(
    styles.variants[variant],
    styles.shapes[shape],
    'overflow-hidden',
    className
  )

  return <div className={classes}>{children}</div>
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  shape: PropTypes.oneOf(['default']),
}
