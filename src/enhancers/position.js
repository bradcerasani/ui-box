import PropTypes from 'prop-types'
import getCss from '../get-css'

export const propTypes = {
  bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  position: PropTypes.string,
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export const propAliases = {}

export const propValidators = {}

const position = {
  className: 'pst',
  cssName: 'position',
  jsName: 'position',
  safeValue: true,
  isPrefixed: true,
}
const top = {
  className: 'top',
  cssName: 'top',
  jsName: 'top',
}
const right = {
  className: 'rgt',
  cssName: 'right',
  jsName: 'right',
}
const bottom = {
  className: 'btm',
  cssName: 'bottom',
  jsName: 'bottom',
}
const left = {
  className: 'lft',
  cssName: 'left',
  jsName: 'left',
}

export const propEnhancers = {
  bottom: value => getCss(bottom, value),
  left: value => getCss(left, value),
  position: value => getCss(position, value),
  right: value => getCss(right, value),
  top: value => getCss(top, value),
}
