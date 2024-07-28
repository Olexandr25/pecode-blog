import PropTypes from 'prop-types'
import clsx from 'clsx'

const styles = {
  variants: {
    default: 'text-black',
    danger: 'text-red-500',
  },
  levels: {
    1: 'text-5xl',
    2: 'text-4xl',
    3: 'text-3xl',
    4: 'text-2xl',
    5: 'text-xl',
    6: 'text-lg',
  },
}

const Title = ({
  level = 1,
  variant = 'default',
  children,
  className = '',
}) => {
  const Tag = `h${level}`

  const titleClasses = clsx(
    styles.levels[level],
    styles.variants[variant],
    className
  )

  return <Tag className={titleClasses}>{children}</Tag>
}

Title.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  variant: PropTypes.oneOf(['default', 'danger']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default Title
