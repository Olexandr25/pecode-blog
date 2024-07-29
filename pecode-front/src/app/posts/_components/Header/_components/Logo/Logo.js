import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'

const Logo = ({ altText = 'Pecode Logo', className = '' }) => {
  return (
    <Link href="/posts">
      <div className={className}>
        <Image
          src="/assets/logo/pecode-logo.png"
          alt={altText}
          width={150}
          height={50}
          priority
        />
      </div>
    </Link>
  )
}

Logo.propTypes = {
  altText: PropTypes.string,
  className: PropTypes.string,
}

export default Logo
