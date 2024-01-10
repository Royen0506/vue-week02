import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io",
      apiPath: "royen",
      productsData: [],
      productInfo: {},
    };
  },
  methods: {
    checkAdminStatus() {
      axios
        .post(`${this.apiUrl}/v2/api/user/check`)
        .then((res) => {
          this.getData();
        })
        .catch((err) => {
          alert("請先完成登入");
          document.location.href = "index.html";
        });
    },

    getData() {
      axios
        .get(`${this.apiUrl}/v2/api/${this.apiPath}/admin/products/all`)
        .then((res) => {
          this.productsData = res.data.products;
          console.log(this.productsData);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },

    watchProductInfo(product) {
      this.productInfo = product;
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    this.checkAdminStatus();
  },
});

app.mount("#app");
