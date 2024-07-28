import { Title } from '@/components'
import PropTypes from 'prop-types'

const Empty = ({ text = 'No data' }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Title className="text-center" level={2} variant="secondary">
        {text}
      </Title>
    </div>
  )
}

Empty.propTypes = {
  text: PropTypes.string,
}

export default Empty
