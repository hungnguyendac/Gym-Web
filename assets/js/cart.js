function decrease() {
    const quantityInput = document.getElementById("quantity");
    let value = parseInt(quantityInput.value, 10);
    if (value > 1) {
        value--;
    }
    quantityInput.value = value;
}

function increase() {
    const quantityInput = document.getElementById("quantity");
    let value = parseInt(quantityInput.value, 10);
    value++;
    quantityInput.value = value;
}
