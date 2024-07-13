import data from "./data.js";

const productFemale = document.querySelector(".products-female-js");
const productMale = document.querySelector(".products-male-js");

let HTMLFemale = ``;
let HTMLMale = ``;

data.forEach((item) => {
    if (item.type == "Đồng giá 99k nữ" || item.type == "Đồng giá 119k nam") {
        let giaGoc = item.initialPrice;
        let giaGiam = item.price;
        let percent = Math.ceil(((giaGoc - giaGiam) / giaGoc) * 100);

        // Chuyển đổi giá trị thành chuỗi với định dạng tiền tệ
        let giaGocFormatted = giaGoc.toLocaleString("vi-VN");
        let giaGiamFormatted = giaGiam.toLocaleString("vi-VN");

        let HTML = `
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
                    <p>
                        <span>${giaGocFormatted}VNĐ</span>${giaGiamFormatted}VNĐ
                    </p>
                    <div class="circle">
                        <p>${percent}%</p>
                    </div>
                </div>
            </div>
        `;
        if (item.type == "Đồng giá 99k nữ") {
            HTMLFemale += HTML;
        } else if (item.type == "Đồng giá 119k nam") {
            HTMLMale += HTML;
        }
    }
});

productFemale.innerHTML = HTMLFemale;
productMale.innerHTML = HTMLMale;