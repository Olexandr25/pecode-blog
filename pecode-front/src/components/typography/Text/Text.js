import clsx from 'clsx'
import PropTypes from 'prop-types'

const styles = {
  variants: {
    default: 'text-black',
  },
  levels: {
    1: 'text-lg',
    2: 'text-base',
  },
  weights: {
    normal: 'font-normal',
    bold: 'font-bold',
  },
}

const Text = ({ children, className = '', level = 2, variant = 'default' }) => {
  const textClasses = clsx(
    styles.levels[level],
    styles.variants[variant],
    className
  )

  return <span className={textClasses}>{children}</span>
}

Text.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  level: PropTypes.oneOf([1, 2]),
  variant: PropTypes.oneOf(['default']),
}

export default Text
