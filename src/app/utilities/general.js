export function generateId (prefix) {
  return (prefix || '_local_') + (new Date()).getTime()
}
