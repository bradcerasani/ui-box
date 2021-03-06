import cx from 'classnames'
import {propEnhancers} from './enhancers'
import expandAliases from './expand-aliases'
import * as styles from './styles'
import * as cache from './cache'

/**
 * Converts the CSS props to class names and inserts the styles.
 */
export default function enhanceProps(rawProps) {
  const propsMap = expandAliases(rawProps)
  const enhancedProps = {}
  let className = rawProps.className || ''

  for (const [propName, propValue] of propsMap) {
    const cachedClassName = cache.get(propName, propValue)
    if (cachedClassName) {
      className = cx(className, cachedClassName)
      continue
    }

    const enhancer = propEnhancers[propName]
    // Skip false boolean enhancers. e.g: `clearfix={false}`
    // Also allows omitting props via overriding with `null` (i.e: neutralising props)
    if (
      enhancer &&
      (propValue === null || propValue === undefined || propValue === false)
    ) {
      continue
    } else if (!enhancer) {
      // Pass through native props. e.g: disabled, value, type
      enhancedProps[propName] = propValue
      continue
    }

    const newCss = enhancer(propValue)
    // Allow enhancers to return null for invalid values
    if (newCss) {
      styles.add(newCss.styles)
      cache.set(propName, propValue, newCss.className)
      className = cx(className, newCss.className)
    }
  }

  return [className, enhancedProps]
}
