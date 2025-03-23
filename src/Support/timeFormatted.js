exports.datetime = () => {
  const now = new Date;

  const year = now.getFullYear()
  const month = String(now.getMonth()).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hour = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
}

exports.formatDatetimeBr = (date) => {
  const now = new Date(date)

  const year = now.getFullYear()
  const month = String(now.getMonth()).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hour = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`
}