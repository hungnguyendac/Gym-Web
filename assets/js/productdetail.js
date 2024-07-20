import data from "./data.js";

// Hàm để lấy giá trị của một query parameter từ URL
const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

// Lấy id sản phẩm từ URL
const productId = getQueryParam("id");

// Tìm sản phẩm trong dữ liệu dựa trên id
const product = data.find((item) => item.id.toString() === productId);

if (product) {
    const productDetailEL = document.querySelector(".product-detail-js");

    let HTML = `
        <div class="col-12 col-sm-12 col-md-12">
            <p>
                <a href="../index.html">Trang chủ</a> /
                <a href="producttittle.html?fashion=${product.fashion}">
                    Đồ tập ${product.fashion}
                </a> /
                <a href="producttittle.html?fashion=${product.fashion}&type=${product.type}">
                    ${product.type}
                </a>
            </p>
        </div>
        <div class="col-12 col-sm-6 col-md-6">
            <div class="banner">
                <div class="owl-carousel owl-theme">
                    <div class="item">
                        <img
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
                <h3>${product.name}</h3>
                <hr />
                <h3>${product.price.toLocaleString("vi-VN")} VNĐ</h3>
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
                <h5><a href="">SHOP GẦN NHẤT</a></h5>
                <form>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        value="1"
                    />
                    <button type="button">THÊM VÀO GIỎ HÀNG</button>
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
