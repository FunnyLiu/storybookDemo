export const initProps = (args) => {
  const props = {}
  Object.keys(args).forEach(arg => {
    if (Object.prototype.toString.call(args[arg]) !== '[object Function]') {
      props[arg] = args[arg]
    }
  })
  return props
}
