// Handler que busca um pedido de verdade (quando você tiver orderId)
export const getOrder = async (ctx: Context) => {
  const {
    clients: { oms },
    vtex: { logger, route },
  } = ctx

  const orderId = route.params.orderId as string

  if (!orderId) {
    ctx.status = 400
    ctx.body = { error: 'Missing orderId' }

    return
  }

  try {
    const order = await oms.order(orderId)

    ctx.status = 200
    ctx.body = order
  } catch (err) {
    logger.error({
      message: 'Error fetching order from OMS',
      orderId,
      err,
    })

    ctx.status = 500
    ctx.body = { error: 'Error fetching order' }
  }
}
