// Sự kiện click Hướng dẫn chọn size
const sizeML = document.querySelector(".size-guide-male");
const sizeWM = document.querySelector(".size-guide-women");

const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal-img");

if (sizeML) {
    sizeML.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = "./assets/img/Screenshot-2024-06-30-131608.png";
        modal.addEventListener("click", () => {
            modal.style.display = "none";
        });
    });
}

if (sizeWM) {
    sizeWM.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = "./assets/img/Screenshot-2024-07-02-143806.png";
        modal.addEventListener("click", () => {
            modal.style.display = "none";
        });
    });
}

// Sự kiện ấn màu sắc, size và nút thêm giỏ hàng
const colorOptions = document.querySelectorAll(".color-option");
const colorLabel = document.getElementById("color-label");
const sizeOptions = document.querySelectorAll(".size-option");
const sizeLabel = document.getElementById("size-label");
const buttonEL = document.getElementById("add-to-cart");

// Cập nhật trạng thái của nút thêm giỏ hàng
let selectedColor = null;
let selectedSize = null;
const updateButtonState = () => {
    if (sizeOptions.length === 0) {
        // Nếu không có lựa chọn kích thước
        if (selectedColor) {
            buttonEL.disabled = false;
        } else {
            buttonEL.disabled = true;
        }
    } else {
        // Nếu có lựa chọn kích thước
        if (selectedColor && selectedSize) {
            buttonEL.disabled = false;
        } else {
            buttonEL.disabled = true;
        }
    }
};

// Sự kiện click màu sắc
colorOptions.forEach((option) => {
    option.addEventListener("click", () => {
        colorOptions.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");
        selectedColor = option.getAttribute("data-color");
        colorLabel.textContent = `Màu sắc: ${selectedColor}`;
        updateButtonState();
    });
});

// Sự kiện click size
sizeOptions.forEach((option) => {
    option.addEventListener("click", () => {
        sizeOptions.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");
        selectedSize = option.getAttribute("data-size");
        sizeLabel.textContent = `Size: ${selectedSize}`;
        updateButtonState();
    });
});

// Thêm sản phẩm vào giỏ hàng
// B1: Truy cập phần tử
const btnCard = document.querySelector(".button-card");
const cardModalOverlay = document.querySelector(".cart-modal-overlay");
const spanText = document.querySelector(".total span");
const cartBtn = document.querySelector(".cart-buttons");
const cartTotal = document.querySelector(".cart-total");

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

btnCard.addEventListener("click", () => {
    cardModalOverlay.style.transform = "translateX(0)";
    spanText.style.display = "none";
    cartBtn.style.display = "block";
    cartTotal.style.display = "block";
    btnCardClicked();
});

// B2: Lấy thông tin sản phẩm
const btnCardClicked = () => {
    let imageSrc = document.querySelector(".product-image").src;
    let nameProduct = document.querySelector(".name-product").innerHTML;
    let priceProduct = document.querySelector(".product-price").innerHTML;
    let quantityInput = document.getElementById("quantity").value;

    addToCartItem(
        imageSrc,
        nameProduct,
        priceProduct,
        selectedColor,
        selectedSize,
        quantityInput

        // selectedColor, selectedSize đã có ở trên
    );

    // Lưu thông tin sản phẩm vào LocalStorage
    saveToLocalStorage(
        imageSrc,
        nameProduct,
        priceProduct,
        selectedColor,
        selectedSize,
        quantityInput
    );
};

const addToCartItem = (
    imageSrc,
    nameProduct,
    priceProduct,
    selectedColor,
    selectedSize,
    quantityInput
) => {
    let cartModalMain = document.querySelector(".cart-modal-main");

    // Kiểm tra xem sản phẩm đã tồn tại chưa
    let cartItems = cartModalMain.getElementsByClassName("cart-item");
    let itemExists = false;

    for (let cartItem of cartItems) {
        let colorSizeText = cartItem.querySelector(".color-size").innerText;
        let colorMatches = colorSizeText.includes(`MÀU SẮC: ${selectedColor}`);
        let sizeMatches = selectedSize
            ? colorSizeText.includes(`SIZE: ${selectedSize}`)
            : true;

        if (colorMatches && sizeMatches) {
            let quantityElement = cartItem.querySelector(
                ".cart-item-details p:nth-child(3)"
            );
            let currentQuantity = parseInt(
                quantityElement.innerHTML.split("×")[0].trim()
            );
            quantityElement.innerHTML = `${
                currentQuantity + parseInt(quantityInput)
            } × ${priceProduct}`;
            itemExists = true;
            break;
        }
    }

    if (!itemExists) {
        let divEle = document.createElement("div");
        divEle.classList.add("cart-modal-main");

        let cartHTML = `
                <div class="cart-items">
                    <div class="cart-item">
                        <img
                            src="${imageSrc}"
                            alt="Product Image"
                            class="cart-item-image"
                        />
                        <div class="cart-item-details">
                            <h4>${nameProduct}</h4>
                            <p class="color-size">
                                MÀU SẮC: ${selectedColor} 
                                ${
                                    product.fashion !== "Phụ kiện"
                                        ? `SIZE: ${selectedSize}`
                                        : ""
                                }
                            </p>
                            <p>${quantityInput} × ${priceProduct}</p>
                        </div>
                        <i class="fas fa-times cart-item-remove"></i>
                    </div>
                </div>
            `;

        divEle.innerHTML = cartHTML;

        // Thêm mới sản phẩm vào giỏ hàng
        cartModalMain.appendChild(divEle);
    }
    updateCartPrice();
    updateCartQuantity();

    // Sự kiện ấn nút Xóa sản phẩm trong giỏ hàng
    let deleteSp = document.querySelectorAll(".cart-item-remove");
    deleteSp.forEach((btnRemove) => {
        btnRemove.addEventListener("click", () => {
            removeItem(btnRemove);
            updateCartPrice();
            if (cartItems.length === 0) {
                spanText.style.display = "block";
                cartBtn.style.display = "none";
                cartTotal.style.display = "none";
            } else {
                spanText.style.display = "none";
                cartBtn.style.display = "block";
                cartTotal.style.display = "block";
            }
            updateCartQuantity();
        });
    });
};

// Hàm Xóa sản phẩm
const removeItem = (item) => {
    // Lấy thông tin sản phẩm cần xóa
    let itemName = item.parentElement.querySelector(
        ".cart-item-details h4"
    ).innerText;
    let colorSizeText =
        item.parentElement.querySelector(".color-size").innerText;
    let itemColor = colorSizeText.split("MÀU SẮC: ")[1].split(" ")[0];
    let itemSize = colorSizeText.includes("SIZE")
        ? colorSizeText.split("SIZE: ")[1]
        : "";

    // Lọc lại danh sách giỏ hàng để loại bỏ sản phẩm cần xóa
    cartItems = cartItems.filter((cartItem) => {
        let isSameName = cartItem.nameProduct === itemName;
        let isSameColor = cartItem.selectedColor === itemColor;
        let isSameSize = cartItem.selectedSize === itemSize;

        return !(isSameName && isSameColor && isSameSize);
    });

    // Cập nhật lại LocalStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    item.parentElement.remove();
};

// Cập nhật giá trị trong giỏ hàng
const updateCartQuantity = () => {
    let cartItems = document.querySelectorAll(".cart-item");
    let cartQuantity = document.querySelector(".cart-quantity");
    let totalQuantity = 0;

    cartItems.forEach((cartItem) => {
        let quantityElement = cartItem.querySelector(
            ".cart-item-details p:nth-child(3)"
        );
        let quantity = parseInt(quantityElement.innerHTML.split("×")[0].trim());
        totalQuantity += quantity;
    });

    // Cập nhật giá trị tổng số lượng
    cartQuantity.textContent = totalQuantity;

    if (totalQuantity > 99) {
        cartQuantity.textContent = "99+";
    }
};

// Cập nhật giá tiền
const updateCartPrice = () => {
    let cartItems = document.querySelectorAll(".cart-item");
    let cartTotal = document.querySelector(".cart-total");
    let total = 0;

    cartItems.forEach((cartItem) => {
        let priceElement = cartItem.querySelector(
            ".cart-item-details p:nth-child(3)"
        );
        let price = parseInt(
            priceElement.innerHTML.split("×")[1].replace(/[^0-9]/g, "")
        );
        let quantity = parseInt(priceElement.innerHTML.split("×")[0].trim());

        total += price * quantity;
    });

    // Cập nhật tổng số tiền
    if (!cartTotal) {
        cartTotal = document.createElement("p");
        cartTotal.classList.add("cart-total");
        document.querySelector(".cart-modal-main").appendChild(cartTotal);
    }
    cartTotal.innerHTML = `Tổng số tiền: ${total.toLocaleString()} VNĐ`;
};

const saveToLocalStorage = (
    imageSrc,
    nameProduct,
    priceProduct,
    selectedColor,
    selectedSize,
    quantityInput
) => {
    // Kiểm tra xem sản phẩm đã tồn tại chưa
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    let itemExists = cartItems.some((item) => {
        return (
            item.nameProduct === nameProduct &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
        );
    });

    if (itemExists) {
        cartItems = cartItems.map((item) => {
            if (
                item.nameProduct === nameProduct &&
                item.selectedColor === selectedColor &&
                item.selectedSize === selectedSize
            ) {
                return {
                    ...item,
                    quantity: item.quantity + parseInt(quantityInput),
                };
            }
            return item;
        });
    } else {
        cartItems.push({
            imageSrc,
            nameProduct,
            priceProduct,
            selectedColor,
            selectedSize,
            quantity: parseInt(quantityInput),
        });
    }

    // Lưu lại danh sách giỏ hàng vào LocalStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// Khôi phục giỏ hàng từ LocalStorage khi trang tải lại
const restoreCartFromLocalStorage = () => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    cartItems.forEach((item) => {
        addToCartItem(
            item.imageSrc,
            item.nameProduct,
            item.priceProduct,
            item.selectedColor,
            item.selectedSize,
            item.quantity
        );
    });

    updateCartPrice();
    updateCartQuantity();

    if (cartItems.length === 0) {
        spanText.style.display = "block";
        cartBtn.style.display = "none";
        cartTotal.style.display = "none";
    } else {
        spanText.style.display = "none";
        cartBtn.style.display = "block";
        cartTotal.style.display = "block";
    }
};
restoreCartFromLocalStorage();
