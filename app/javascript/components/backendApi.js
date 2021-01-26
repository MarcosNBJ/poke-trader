import axios from "axios"
import $ from "jquery"



const backendApi = axios.create({
    baseURL: `${process.env.BASE_URL}/api/v1`,
    headers: {
      "X-CSRF-Token": $('meta[name="csrf-token"]').attr("content"),
    },
    validateStatus: function (status) {
      return status < 500
    }
})

export default backendApi;