import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = createApp({
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    login() {
      const apiUrl = "https://vue3-course-api.hexschool.io/v2/admin/signin";
      const adminInfo = {
        username: this.email,
        password: this.password,
      };
      axios
        .post(`${apiUrl}`, adminInfo)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `myToken=${token}; expires=${new Date(expired)};`;
          document.location.href = "products.html";
        })
        .catch((err) => {
          alert(err.data.message);
          this.email = "";
          this.password = "";
        });
    },
  },
});

app.mount("#app");
