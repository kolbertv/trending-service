import { RedisCache } from '../modules'
import { Adapter } from '../adapter'

class Service {
  private readonly baseUrl

  constructor() {
    this.baseUrl = process.env.BASE_URL
  }

  public ping() {
    return { ping: 'pong' }
  }

  public async auth(token: string) {
    const result = await RedisCache.set('token', { token })

    console.log(new Date(Date.now()), 'Info', { result })

    return result
  }

  public async getBalance() {
    const result = await RedisCache.get<{ token: string }>('token')

    if (!result?.token) {
      throw ({ status: 401, message: 'Token does not exist' })
    }

    if (!this.baseUrl) {
      throw ({ status: 500, message: 'Base url does not exist' })
    }

    const adapter = new Adapter({
      baseUrl: this.baseUrl,
      token: result.token
    })

    const balance = await adapter.getBalance()

    console.log(new Date(Date.now()), 'Info', { balance })

    return { balance }
  }
}

export default new Service()
