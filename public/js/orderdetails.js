document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderNumber = urlParams.get('orderNum');
  let res = await fetch(`/order?orderNum=${orderNumber}`)

  let result = await res.json()

  const orderDetails = document.getElementById('orderDetails');
  // console.log(result.data)
  for (let product of result.data) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
            <div><fieldset>
                <div>Order Number: ${orderNumber}</div>
                <div class="productName">Product Name: ${product.product_name}</div>
                <div class="subtotalPrice">Price: ${product.product_price} * ${product.quantity} = ${product.subtotal}</div>
            </fieldset></div>
        `;
    orderDetails.appendChild(productDiv)
    //價錢
    const totalPrice = document.getElementById('totalPrice')
    totalPrice.textContent = `${result.totalPrice.total}`

    //Stripe
    const stripe = Stripe('pk_test_51PreUORwdDaooQDsXVRYADhkpUyJjq3dMOSpQuv4mYsDcrw1kR9F0l157cC5IeJSOeSC0ipQXwVCy4cy6p2j05F100pYHXCLcU');
    const checkOut = document.getElementById('checkOutBtn')
    const orderId = orderNumber
    console.log(orderId)

    checkOut.addEventListener('click', async (event) => {
      event.preventDefault();




      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId })
      })
      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (result.error) {
        alert(result.error.message);
      }
    })
  }
})