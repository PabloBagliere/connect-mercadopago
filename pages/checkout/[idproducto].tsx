import { useRouter } from 'next/router';
import Script from 'next/script';

const Checkout = () => {
  const router = useRouter();
  const { idproducto } = router.query;

  return (
    <>
      <Script
        id="mercadopagoFront"
        src="https://sdk.mercadopago.com/js/v2"
        onLoad={() => {
          // @ts-ignore
          const mp = new MercadoPago(
            'TEST-dd32576d-6c78-4da1-8db9-8031b906f8c4'
          );
          const cardForm = mp.cardForm({
            amount: '100.5',
            autoMount: true,
            form: {
              id: 'form-checkout',
              cardholderName: {
                id: 'form-checkout__cardholderName',
                placeholder: 'Titular de la tarjeta',
              },
              cardholderEmail: {
                id: 'form-checkout__cardholderEmail',
                placeholder: 'E-mail',
              },
              cardNumber: {
                id: 'form-checkout__cardNumber',
                placeholder: 'Número de la tarjeta',
              },
              cardExpirationMonth: {
                id: 'form-checkout__cardExpirationMonth',
                placeholder: 'Mes de vencimiento',
              },
              cardExpirationYear: {
                id: 'form-checkout__cardExpirationYear',
                placeholder: 'Año de vencimiento',
              },
              securityCode: {
                id: 'form-checkout__securityCode',
                placeholder: 'Código de seguridad',
              },
              installments: {
                id: 'form-checkout__installments',
                placeholder: 'Cuotas',
              },
              identificationType: {
                id: 'form-checkout__identificationType',
                placeholder: 'Tipo de documento',
              },
              identificationNumber: {
                id: 'form-checkout__identificationNumber',
                placeholder: 'Número de documento',
              },
              issuer: {
                id: 'form-checkout__issuer',
                placeholder: 'Banco emisor',
              },
            },
            callbacks: {
              onFormMounted: (error: any) => {
                if (error)
                  return console.warn('Form Mounted handling error: ', error);
                console.log('Form mounted');
              },
              onFormUnmounted: (error: any) => {
                if (error)
                  return console.warn('Form Unmounted handling error: ', error);
                console.log('Form unmounted');
              },
              onIdentificationTypesReceived: (
                error: any,
                identificationTypes: any
              ) => {
                if (error)
                  return console.warn(
                    'identificationTypes handling error: ',
                    error
                  );
              },
              onPaymentMethodsReceived: (error: any, paymentMethods: any) => {
                if (error)
                  return console.warn('paymentMethods handling error: ', error);
                console.log('Payment Methods available: ', paymentMethods);
              },
              onIssuersReceived: (error: any, issuers: any) => {
                if (error)
                  return console.warn('issuers handling error: ', error);
              },
              onInstallmentsReceived: (error: any, installments: any) => {
                if (error)
                  return console.warn('installments handling error: ', error);
              },
              onCardTokenReceived: (error: any, token: any) => {
                if (error) return console.warn('Token handling error: ', error);
                console.log('Token available: ', token);
              },
              onSubmit: (event: { preventDefault: () => void }) => {
                event.preventDefault();
                const {
                  paymentMethodId: payment_method_id,
                  issuerId: issuer_id,
                  cardholderEmail: email,
                  amount,
                  token,
                  installments,
                  identificationNumber,
                  identificationType,
                } = cardForm.getCardFormData();
                fetch('/api/process_payment', {
                  method: 'POST',
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    token,
                    issuer_id,
                    payment_method_id,
                    transaction_amount: Number(amount),
                    installments: Number(installments),
                    description: "Descripción del producto",
                    payer: {
                      email,
                      identification: {
                        type: identificationType,
                        number: identificationNumber,
                      },
                    },
                  }),
                })
              },
              onFetching: (resource: any) => {
                console.log('Fetching resource: ', resource);

                // Animate progress bar
                const progressBar = document.querySelector('.progress-bar');
                // @ts-ignore
                progressBar.removeAttribute('value');

                return () => {
                  // @ts-ignore
                  progressBar.setAttribute('value', '0');
                };
              },
            },
          });
        }}
      />
      <form id="form-checkout">
        <input type="text" name="cardNumber" id="form-checkout__cardNumber" />
        <input
          type="text"
          name="cardExpirationMonth"
          id="form-checkout__cardExpirationMonth"
        />
        <input
          type="text"
          name="cardExpirationYear"
          id="form-checkout__cardExpirationYear"
        />
        <input
          type="text"
          name="cardholderName"
          id="form-checkout__cardholderName"
        />
        <input
          type="email"
          name="cardholderEmail"
          id="form-checkout__cardholderEmail"
        />
        <input
          type="text"
          name="securityCode"
          id="form-checkout__securityCode"
        />
        <select name="issuer" id="form-checkout__issuer"></select>
        <select
          name="identificationType"
          id="form-checkout__identificationType"
        ></select>
        <input
          type="text"
          name="identificationNumber"
          id="form-checkout__identificationNumber"
        />
        <select name="installments" id="form-checkout__installments"></select>
        <button type="submit" id="form-checkout__submit">
          Pagar
        </button>
        <progress value="0" className="progress-bar">
          Cargando...
        </progress>
      </form>
      <p>Checkout: {idproducto}</p>
    </>
  );
};

export default Checkout;
