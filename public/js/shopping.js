const stripePublicKey = 'pk_test_51PreUORwdDaooQDsXVRYADhkpUyJjq3dMOSpQuv4mYsDcrw1kR9F0l157cC5IeJSOeSC0ipQXwVCy4cy6p2j05F100pYHXCLcU';
const stripe = Stripe(stripePublicKey);
const checkoutButton = document.getElementById('checkout-button');
const displayProductPrice = document.getElementById('product-price');
const quantityInput = document.getElementById('quantity');

window.addEventListener('load', function () {
    quantityInput.addEventListener('input', function () {
        const quantity = parseInt(quantityInput.value, 10);
        const finalPrice = quantity * 1999; //$1999係當前售價
        displayProductPrice.textContent = finalPrice.toString();
    });
});

checkoutButton.addEventListener('click', function () {
    const price = displayProductPrice.innerText * 100;
    fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            price: price,
            currency: 'hkd'
        })
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (session) {
            return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function (result) {
            if (result.error) {
                alert(result.error.message);
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
});