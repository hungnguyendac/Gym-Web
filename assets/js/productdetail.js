import data from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
    // Hàm để lấy giá trị của một query parameter từ URL
    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    // Lấy id sản phẩm từ URL
    const productId = getQueryParam("id");

    if (!productId) {
        return;
    }

    // Tìm sản phẩm trong dữ liệu dựa trên id
    const product = data.find((item) => item.id.toString() === productId);

    if (product) {
        const productDetailEL = document.querySelector(".product-detail-js");

        let HTML = `
            <div class="col-12 col-sm-12 col-md-12">
                <p>
                    <a href="./index.html">Trang chủ</a> /
                    <a href="producttittle.html?fashion=${product.fashion}">
                        Đồ tập ${product.fashion}
                    </a> /
                    <a href="producttittle.html?fashion=${
                        product.fashion
                    }&type=${product.type}">
                        ${product.type}
                    </a>
                </p>
            </div>
            <div class="col-12 col-sm-6 col-md-6">
                <div class="banner">
                    <div class="owl-carousel owl-theme">
                        <div class="item">
                            <img
                                class="product-image"
                                src="${product.normalImage}"
                                alt="Ảnh banner 1"
                            />
                        </div>
                        <div class="item">
                            <img
                                src="${product.hoverImage}"
                                alt="Ảnh banner 2"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-6">
                <div class="product-detail-tittle">
                    <h3 class="name-product">${product.name}</h3>
                    <hr />
                    <h3 class="product-price">${product.price.toLocaleString(
                        "vi-VN"
                    )} VNĐ </h3>
                    <ul>
                        <li>
                            <b>Chất liệu</b>: ${product.tittle}
                        </li>
                        <li>
                            <b>Kiểu dáng</b>: ${product.style}
                        </li>
                    </ul>
                    ${
                        product.fashion === "Nam"
                            ? `<h6><span class="size-guide-male">Hướng dẫn chọn size nam</span></h6>`
                            : product.fashion === "Nữ"
                            ? `<h6><span class="size-guide-women">Hướng dẫn chọn size nữ</span></h6>`
                            : "" // Ẩn đi nếu là phụ kiện
                    }
                    <b>Hotline tư vấn miễn phí: 0902 77 1186</b>
                    <h5><a href="./shop.html">SHOP GẦN NHẤT</a></h5>
                    <div>
                        <label id="color-label" for="colors">Màu sắc</label>
                        <div id="colors" class="color-options">
                            <!-- Thêm các màu sắc -->
                            <span class="color-option" data-color="Đen" style="background-color: black;"></span>
                            <span class="color-option" data-color="Đỏ" style="background-color: red;"></span>
                            <span class="color-option" data-color="Nâu" style="background-color: #B87333;"></span>
                            <span class="color-option" data-color="Trắng" style="background-color: white;"></span>
                            <span class="color-option" data-color="Xanh Dương" style="background-color: blue;"></span>
                        </div>
                        ${
                            product.fashion !== "Phụ kiện"
                                ? `<label id="size-label" for="sizes">Size</label>
                            <div id="sizes" class="size-options">
                                <!-- Thêm các size -->
                                <span class="size-option" data-size="M">M</span>
                                <span class="size-option" data-size="L">L</span>
                                <span class="size-option" data-size="XL">XL</span>
                                <span class="size-option" data-size="2XL">2XL</span>
                                <span class="size-option" data-size="3XL">3XL</span>
                            </div>`
                                : ""
                        }
                    </div>
                    <form>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            value="1"
                        />
                        <button class="button-card" id="add-to-cart" type="button" disabled>THÊM VÀO GIỎ HÀNG</button>
                    </form>
                    <div class="product-detail-description">
                        <h4>VÌ SAO CHỌN THEGIOIDOTAP.VN ?</h4>
                        <ul>
                            <li>
                                <img src="./assets/img/htcuahang.png" alt="htcuahang">
                                <p><b>HỆ THỐNG HƠN 20 CỬA HÀNG </b>(Trên toàn quốc)</p>
                            </li>
                            <li>
                                <img src="./assets/img/Hotline-lien-he.png" alt="htcuahang">
                                <p><b>0902 77 1186 </b>(9:30 - 21:00 mỗi ngày)</p>
                            </li>
                            <li>
                                <img src="./assets/img/section1.png" alt="htcuahang">
                                <p><b>Miễn phí giao hàng </b>(Toàn quốc cho hóa đơn từ 500k)</p>
                            </li>
                            <li>
                                <img src="./assets/img/Mien-phi-giao-hang.png" alt="htcuahang">
                                <p><b>THANH TOÁN TIỆN LỢI </b>(Nhận hàng rồi mới trả tiền)</p>
                            </li>
                            <li>
                                <img src="./assets/img/section3.png" alt="htcuahang">
                                <p><b>ĐỔI HÀNG DỄ DÀNG </b>(Đổi mẫu/size/màu trong 30 ngày)</p>
                            </li>
                        </ul>
                    </div>
                    <div class="product-detail-description">
                        <h6>Combo 5 Tặng 1: Mua 5 sản phẩm quần áo nguyên giá, nhận ngay 1 sản phẩm miễn phí</h6>
                    </div>
                </div>
            </div>
        `;

        productDetailEL.innerHTML = HTML;
    } else {
        console.error("Product not found");
    }

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
            let colorMatches = colorSizeText.includes(
                `MÀU SẮC: ${selectedColor}`
            );
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
            let quantity = parseInt(
                quantityElement.innerHTML.split("×")[0].trim()
            );
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
            let quantity = parseInt(
                priceElement.innerHTML.split("×")[0].trim()
            );

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
});
