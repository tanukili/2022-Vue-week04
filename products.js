// 載入 Vue
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

// 宣告 Modal (因為全域會使用到)
let productModal = {};
let delProductModal = {};

const app = {
    data() {
        return {
            // api 路徑
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'vuejslive2022',
            products: [],
            tempProduct: {
                // 若有內層的 arr 或 obj，建議初始化時帶上
                imagesUrl: [],
            },
            isNew: false, // 確認是編輯或新增用
        }
    },
    // 使用 created() 會報錯，因為是 html 渲染前調用；mounted() 則是渲染後再針對 html 的 dom 進行操作
    mounted() {
        // modal 初始化
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
        });
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
        });

        // 取出 token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        // 記得要加 this
        this.checkAdmin();
    },
    methods: {
        // 串接 api：檢查權限
        checkAdmin() {
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
                .then(() => {
                    // 先確認權限，再渲染畫面
                    this.getData();
                })
                .catch((err) => {
                    alert(err.data.message);
                    // 導回登入頁面
                    window.location = 'login.html';
                })
        },
        // 串接 api：取得產品資料
        getData() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
            axios.get(url)
                .then((res) => {
                    this.products= res.data.products;
                    console.log(this.products);
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        },
        // 更新資料：混和多個類似的程式碼（例如:路徑相似、資料格式相同）
        updateProduct() {
            let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            let method = 'post'
            // 用 isNew 判斷 API 怎麼運行，若不是新增資料則替換掉 url 和 method
            if (!this.isNew) {
                url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
                method = 'put';
            }
            // 將 api 方透過變數寫入
            axios[method](url, { data: this.tempProduct})
                .then(() => {
                    this.getData();
                    // 關閉視窗
                    productModal.hide();
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        },
        // 開啟 modal
        openModal(status, product) {
            // 判斷要開啟的 modal
            if (status === 'create') {
                productModal.show();
                this.isNew = true; // 是新增品項
                // 帶入初始化資料
                this.tempProduct = {
                    imagesUrl: [],
                };
            }else if (status === 'edit') {
                productModal.show();
                this.isNew = false; // 不是新增品項
                // 帶入要編輯的資料（透過參數傳遞）
                // 物件傳參考特性，使用展開運算子淺層拷貝
                this.tempProduct = {...product};
                // 若 imagesUrl 非陣列，在編輯時轉為，以加入新圖片
                if (!Array.isArray(product.imagesUrl)){
                    product.imagesUrl = [];
                    this.tempProduct = {...product};
                };
            }else if (status === 'delete'){
                delProductModal.show();
                this.tempProduct = {...product}; // 等等取 id 使用
            }
        },
        // 刪除資料
        deleteProduct() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
            axios.delete(url)
                .then(() => {
                    this.getData();
                    // 關閉視窗
                    delProductModal.hide();
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        }
    },
};
  
createApp(app).mount('#app')