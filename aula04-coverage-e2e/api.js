const http = require("http")

const DEFAULT_USER =  { username: 'Skuth', password: '123123' }

const routes = {
  "/contact:get": ({ response }) => {
    response.write("Contact us page")
    return response.end()
  },

  "/login:post": async ({ request, response }) => {
    // response é um iterator!
    for await (const data of request) {
      const user = JSON.parse(data)
      
      if (
        user.username !== DEFAULT_USER.username ||
        user.password !== DEFAULT_USER.password
      ) {
        response.writeHead(401)
        response.write("Loggin failed!")
        return response.end()
      }

      response.write("Loggin has succeeded!")
      return response.end()
    }
  },

  default: ({ response }) => {
    response.write("Hello Apenas")
    return response.end()
  }
}

const handler = function (request, response) {
  const { url, method } = request

  const routeKey = `${url}:${method.toLowerCase()}`

  const choose = routes[routeKey] || routes.default

  response.writeHead(200, {
    "Content-Type": "text/html"
  })

  return choose({ request, response })
}

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("App running at", 3000))

module.exports = app