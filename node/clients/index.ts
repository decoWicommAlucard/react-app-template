import { IOClients } from '@vtex/api'
import { OMS } from '@vtex/clients'

export class Clients extends IOClients {
  // Client do OMS
  public get oms() {
    return this.getOrSet('oms', OMS)
  }
}
