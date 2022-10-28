import Cookies from 'js-cookie'

export const fetchData = async (url, method, body) => {
  const token = Cookies.get('token')
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: 'Bearer ' + token,
    },
    body,
  })
  if (res.ok === true) return res.json()
  throw new Error('Impossible de contacter le serveur')
}
