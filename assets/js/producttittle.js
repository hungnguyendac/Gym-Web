import data from "./data.js";

// Xử lý sự kiện click icon menu
const iconMenu = document.querySelectorAll(".icon-1");
const menu2 = document.querySelectorAll(".menu .menu-2");
const menu2Icon = document.querySelectorAll(".menu-2 li i");
const menu3 = document.querySelectorAll(".menu-2 .menu-3");

iconMenu.forEach( (item, index) => {
    item.addEventListener("click", () => {
        menu2.forEach( (menuItem, menuIndex) => {
            if (index === menuIndex) {
                // Hiển thị menu2 tương ứng với item được nhấp
                menuItem.style.display = menuItem.style.display === "block" ? "none" : "block";
            } 
        })
    })
});
menu2Icon.forEach ( (item, index) => {
    item.addEventListener("click", () => {
        menu3.forEach((menuItem, menuIndex) => {
            if (index === menuIndex) {
                // Hiển thị menu3 tương ứng với item được nhấp
                menuItem.style.display =
                    menuItem.style.display === "block" ? "none" : "block";
            }
        });
    });
});


// Hàm để lấy giá trị của một query parameter từ URL
const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

// Lấy fashion, type sản phẩm từ URL
const productFashion = getQueryParam("fashion");
const productType = getQueryParam("type");

// Tìm sản phẩm trong dữ liệu dựa trên fashion và type nếu tồn tại
const products = data.filter((item) => {
    const matchesFashion = productFashion ? item.fashion.toString() === productFashion : true;
    const matchesType = productType ? item.type.toString().includes(productType) : true;
    return matchesFashion && matchesType;
});



const renderProducts = (products, listEL) => {
    const htmlEL = document.querySelector(listEL);

    let HTML = ``;
    products.forEach((item) => {
        if (item.type != "Đồng giá 119k nam" && item.type != "Đồng giá 99k nữ") {
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
        }
    });

    htmlEL.innerHTML = HTML;
};

if (products.length > 0) {
    renderProducts(products, ".row-producttittle-js");
} else {
    console.error("Không tìm thấy sản phẩm nào với fashion:", productFashion);
}
