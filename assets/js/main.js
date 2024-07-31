import data from "./data.js";

// ---------------------------Mở - Đóng Menu-moblie---------------------------------------
const menu_bar = document.querySelector(".bar-ic");
const popup_menu = document.querySelector(".popup-moblie");
const close_moblie = document.querySelector(".close-moblie");
const overlayEl = document.getElementById("overlay");

menu_bar.addEventListener("click", () => {
    popup_menu.style.left = "0";
    close_moblie.style.display = "inline-block";
    menu_bar.style.opacity = "0";

    overlayEl.style.display = "block";
    document.body.style.overflowY = "hidden";
});

close_moblie.addEventListener("click", () => {
    popup_menu.style.left = "-100%";
    close_moblie.style.display = "none";
    menu_bar.style.opacity = "1";

    overlayEl.style.display = "none";
    document.body.style.overflowY = "scroll";
});

overlayEl.addEventListener("click", () => {
    popup_menu.style.left = "-100%";
    close_moblie.style.display = "none";
    menu_bar.style.opacity = "1";

    overlayEl.style.display = "none";
    document.body.style.overflowY = "scroll";
});


// ----------------------Hiển thị menu-moblie con khi ấn vào icon "down"---------------------
const popupMoblie = document.querySelector(".popup-moblie");
const faDown = document.querySelectorAll(".li-moblie .fa-chevron-down");
const listMenuMoblie = document.querySelectorAll(
    ".li-moblie .list-menu-moblie"
);

faDown.forEach((value, index) => {
    value.addEventListener("click", () => {
        if (listMenuMoblie[index].style.display === "block") {
            listMenuMoblie[index].style.display = "none";
            popupMoblie.style.overflow = "hidden";
        } else {
            listMenuMoblie[index].style.display = "block";
            popupMoblie.style.overflowY = "scroll";
            popupMoblie.style.overflowX = "hidden";
        }
    });
});

/* ----------------------------- Giỏ hàng --------------------------- */
// Đóng - mở Popup giỏ hàng

const cardBtn = document.querySelector(".cart-btn");
const cardModalOverlay = document.querySelector(".cart-modal-overlay");
const closeBtn = document.querySelector("#close-btn");

cardBtn.addEventListener("click", () => {
    cardModalOverlay.style.transform = "translateX(0)";
});

closeBtn.addEventListener("click", () => {
    cardModalOverlay.style.transform = "translateX(200%)";
});

cardModalOverlay.addEventListener("click", (e) => {
    // Kiểm tra xem có ấn vào cart-modal-overlay, đúng -> true, sai -> false
    if (e.target.classList.contains("cart-modal-overlay") == true) {
        cardModalOverlay.style.transform = "translateX(200%)";
    }
});


// ----------------------------Sự kiện click nút button ở Sản phẩm mới----------------------
const buttons = document.querySelectorAll(".tabs button");
const productsNewEl = document.querySelectorAll(".products-new");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        document.querySelector(".button-active").classList.remove("button-active");
        button.classList.add("button-active");

        productsNewEl.forEach((product) => {
            product.classList.remove("products-new-active");
        });

        const targetId = button.getAttribute("data-target");
        const targetProducts = document.getElementById(targetId);
        if (targetProducts) {
            targetProducts.classList.add("products-new-active");
        }
    });
});


// ----------------------------------Lấy sản phẩm ở trang chủ----------------------------------

// ----------------------------Hiển thị sản phẩm mảng data lên giao diện người dùng-----------------
const renderProducts = (data, listEL, fashionType, limit) => {
    const htmlEL = document.querySelector(listEL);

    if (!htmlEL) {
        return; // Không tiếp tục nếu phần tử không tồn tại
    }

    let HTML = ``;
    let count = 0;
    data.forEach((item) => {
        if (
            item.fashion.toLowerCase() === fashionType.toLowerCase() &&
            count < limit
        ) {
            const formattedPrice = item.price.toLocaleString("vi-VN");
            HTML += `
               <div class="col-6 col-sm-4 col-md-3">
                    <div class="product">
                        <a href="productdetail.html?id=${item.id}">
                            <div class="image-container">
                                <img
                                    src="${item.normalImage}"
                                    alt="Normal Image"
                                    class="normal-img"
                                />
                                <img
                                    src="${item.hoverImage}"
                                    alt="Hover Image"
                                    class="hover-img"
                                />
                            </div>
                        </a>
                        <a href="productdetail.html?id=${item.id}">
                            <h3>${item.name}</h3>
                        </a>
                        <p>${formattedPrice} VNĐ</p>
                    </div>
                </div>
            `;
            count++;
        }
    });

    htmlEL.innerHTML = HTML;
};

renderProducts(data, ".products-new-nam-js", "Nam", 4);
renderProducts(data, ".products-new-nu-js", "Nữ", 4);
renderProducts(data, ".products-new-phukien-js", "Phụ kiện", 4);

renderProducts(data, ".product-nam-js", "Nam", 8);
renderProducts(data, ".product-nu-js", "Nữ", 8);
renderProducts(data, ".product-phukien-js", "Phụ kiện", 8);