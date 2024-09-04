document.addEventListener('DOMContentLoaded', async () => {

    let res = await fetch("/checkOrder")

    let result = await res.json()

    const orderForm = document.getElementById('orderForm');

    for (let order of result.data) {
        function formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hur = String(date.getHours()).padStart(2, '0');
            const min = String(date.getMinutes()).padStart(2, '0');
            const sec = String(date.getSeconds()).padStart(2, '0');
            return `${day}-${month}-${year} ${hur}:${min}:${sec}`;
        }
        const createdDate = formatDate(new Date(order.created_at))
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order';
        orderDiv.innerHTML = `
            <div><fieldset>
                <div class="orderId">Order Number: <span>TECKYACADEMY-C32-WSP012-</span>${order.id}</div>
                <div class="orderTotalPrice">Price: ${order.total}</div>
                <div class="orderStatus">Status: ${order.state} </div>
                <div class="orderDate">Order Date: ${createdDate}</div>
                <button type="button" id="detailsBtn" name="checkDetails">Details</button>
            </fieldset></div>
        `;
        orderForm.appendChild(orderDiv)


        const detailsBtn = orderDiv.querySelector('#detailsBtn')
        detailsBtn.addEventListener("click", async (e) => {
            const id = order.id
            window.location.href = `/orderdetails.html?orderNum=${id}`
        })
    }
})