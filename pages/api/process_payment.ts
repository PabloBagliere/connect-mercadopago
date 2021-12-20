import type { NextApiRequest, NextApiResponse } from 'next'
import mercadopago from 'mercadopago';
import { CreatePaymentPayload } from 'mercadopago/models/payment/create-payload.model';
mercadopago.configurations.setAccessToken('TEST-8561028862351724-122020-dcee7b9e1ffa45d9262bb4d7ca51391b-1043496576')

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const payment_data: CreatePaymentPayload = {
    transaction_amount: Number(req.body.transaction_amount),
    token: req.body.token,
    description: req.body.description,
    installments: Number(req.body.installments),
    payment_method_id: req.body.payment_method_id,
    issuer_id: req.body.issuer_id,
    payer: {
      email: req.body.payer.email,
      identification: {
        type: req.body.payer.identification.type,
        number: req.body.payer.identification.number
      }
    }
  };
  console.log(payment_data)
  mercadopago.payment.save(payment_data).then((response) => {
    res.status(response.status).json({
      status: response.body.status,
      status_detail: response.body.status_detail,
      id: response.body.id
    })
  }).catch(error => {
    res.send(error)
  })
}
