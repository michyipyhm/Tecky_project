document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderNumber = urlParams.get('orderNum');
  let res = await fetch(`/order?orderNum=${orderNumber}`)
  if (res.status === 401) {
    alert('Please login first.');
    window.location.href = '/index.html';
    return;
  }

  let result = await res.json()
  // console.log(result)
  const orderId = document.getElementById('orderNum');
  orderId.textContent = `TECKYACADEMY-C32-WSP012-${orderNumber}`

  const orderDetails = document.getElementById('orderDetails');
  // console.log(result.data)
  for (let product of result.data) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
              <div class="productPicName">
                  <div class="productPicture"><img src="${product.image_path}" width="100" height="100"/></div>
                  <div class="productName">${product.product_name}</div>
              </div>
              <div class="productRow">
                  <div>$${product.product_price}</div>
              </div>
              <div class="productRow">
                  <div>${product.quantity}</div>
              </div>
              <div class="productRow">
                  <div>$${product.subtotal}</div>
              </div>
            </div>
        `;
    orderDetails.appendChild(productDiv)
    //價錢
    const totalPrice = document.getElementById('totalPrice')
    const checkOut = document.getElementById('checkOutBtn')
    const cancelBtn = document.getElementById('cancelOrder')
    const orderStatus = document.getElementById('status')

    totalPrice.textContent = `${result.totalPrice.total}`
    orderStatus.textContent = `${result.orderStatus.state}`

    if (orderStatus.textContent === 'Paid') {
      checkOut.style.display = 'none'
      cancelBtn.style.display = 'none'
      orderStatus.classList.add('paid')
    } else if (orderStatus.textContent === 'Canceled') {
      checkOut.style.display = 'none'
      cancelBtn.style.display = 'none'
      orderStatus.classList.add('canceled')

    } else {
      checkOut.style.display = 'block';
      cancelBtn.style.display = 'block';
    }

    //Stripe
    const stripe = Stripe('pk_test_51PreUORwdDaooQDsXVRYADhkpUyJjq3dMOSpQuv4mYsDcrw1kR9F0l157cC5IeJSOeSC0ipQXwVCy4cy6p2j05F100pYHXCLcU');
    const orderId = orderNumber
    // console.log(orderId)

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

//Cancel order
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderNum');
const cancelBtn = document.getElementById('cancelOrder')
console.log(orderId)
cancelBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  const res = await fetch('/orderCancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId })
  })

  const data = await res.json()
  if (res.ok) {
    alert(data.message)
    window.location = "/index.html"
  } else {
    alert(data.message)
  }
})