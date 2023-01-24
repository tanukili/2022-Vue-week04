// 載入 Vue
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

const app ={
    data() {
        return {
            user: {
                username: '',
                password: ''
            },
            apiUrl: 'https://vue3-course-api.hexschool.io/v2'
        }
    },
    methods: {
        login(){
            // 串接登入 api
            const url = `${this.apiUrl}/admin/signin`;
            axios.post(url ,this.user)
                .then((res) => {
                    // 將 token 寫入 cookie
                    console.log(res);
                    const { token ,expired } = res.data
                    document.cookie = `loginToken=${ token }; expires=${ new Date(expired)}, 31 Dec 9999 23:59:59 GMT;`;
                    window.location = 'products.html';
                })
                .catch((err) => {
                    alert(err.data.message);
                })

        }
    },

}

createApp(app).mount('#app');