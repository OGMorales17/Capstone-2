import axios from "axios";


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class CryptoHubApi {
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${CryptoHubApi.token}` };
        const params = (method === "get") ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            if (err.response) {
                let message = err.response.data.error.message;
                throw Array.isArray(message) ? message : [message];

            } else {
                throw ['Sorry, server is down']
            }
        }
    }

    // Individual API routes
    static async getNews() {
        let res = await this.request("news");
        return res;
    }

    static async getEducation() {
        let res = await this.request("education");
        return res;
    }

    static async getEducationById(videoId) {
        let res = await this.request(`education/${videoId}`);
        return res;
    }


    static async getMarket() {
        let res = await this.request("market");
        return res;
    }

    static async getCoinDetails(coinName) {
        const res = await this.request(`market/details/${coinName}`);
        return res;
    }

}

export default CryptoHubApi;