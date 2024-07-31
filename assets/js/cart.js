function decrease() {
    const quantityInput = document.getElementById();
    let value = parseInt(quantityInput.value, 10);
    if (value > 1) {
        value--;
    }
    quantityInput.value = value;
}

function increase() {
    const quantityInput = document.getElementById();
    let value = parseInt(quantityInput.value, 10);
    value++;
    quantityInput.value = value;
}


document.addEventListener('DOMContentLoaded', () => {
    const cartProductEL = document.querySelector(".cart-product-tittle-js");
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    let HTML = ``;
    let total = 0;
    cartItems.forEach( (item) => {
        let priceProductNumber = parseInt(item.priceProduct.replace(/[^\d]/g, ""));
        let totalPrice = item.quantity * priceProductNumber
        total = total + totalPrice;
        HTML += `
            <tr>
                <td class="cart-product">
                    <i class="far fa-times-circle"></i>
                    <img
                        src=${item.imageSrc}
                        alt="abc"
                    />
                    <span>
                        <a href="">${item.nameProduct}</a>
                        <p>Màu sắc: ${item.selectedColor} SIZE: ${
            item.selectedSize
        }</p>
                    </span>
                </td>
                <td class="cart-price">${item.priceProduct}</td>
                <td class="quantity-input">
                    <button class="quantity-button" onclick="decrease()">-</button>
                    <input type="text" id="quantity" value=${item.quantity} readonly/>
                    <button class="quantity-button" onclick="increase()">+</button>
                </td>
                <td class="cart-price cart-price-last">${totalPrice.toLocaleString("vi-VN")} VNĐ</td>
            </tr>
        `;
        //let priceProductNumber = parseInt(priceProduct.replace(/[^\d]/g, ""));
        cartProductEL.innerHTML = HTML;
    });

    let HTML_2 = ``
    const productPriceRight = document.querySelector(".cart-right");
    HTML_2 = `
        <div class="cart-header">CỘNG GIỎ HÀNG</div>
            <div class="cart-item">
                <span class="item-label">Tạm tính</span>
                <span class="item-value">${total.toLocaleString(
                    "vi-VN"
                )} VNĐ</span>
            </div>
            <div class="cart-item">
                <span class="item-label">Phí Giao Hàng</span>
                <span class="item-value">20,000VNĐ</span>
            </div>
            <div class="cart-total">
                <span class="total-label">Tổng</span>
                <span class="total-value">${(total + 20000).toLocaleString(
                    "vi-VN"
                )} VNĐ</span>
            </div>
            <button class="checkout-button">
                TIẾN HÀNH THANH TOÁN
            </button>
    `;
    productPriceRight.innerHTML = HTML_2;
})

