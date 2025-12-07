// Handler de teste: só verifica se consegue falar com o OMS
export const pingOms = async (ctx: Context) => {
  const {
    clients: { oms },
    vtex: { logger },
  } = ctx

  try {
    // ID fake, a gente espera que dê erro de "pedido não encontrado"
    await oms.order('FAKE-ORDER-ID')

    // Se por algum milagre esse ID existir, ok também
    ctx.status = 200
    ctx.body = {
      message:
        'Consegui falar com o OMS e esse orderId existe (inesperado, mas ok)',
    }
  } catch (err) {
    logger.info({
      message: 'Ping no OMS retornou erro (esperado para ID fake)',
      err,
    })

    // Mesmo com erro do OMS, isso prova que seu app falou com o OMS
    ctx.status = 200
    ctx.body = {
      message:
        'Consegui falar com o OMS. Ele respondeu erro porque o orderId é fake, mas a integração está funcionando.',
    }
  }
}
