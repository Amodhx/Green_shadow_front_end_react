import axios from 'axios'

class ApiCall{
    baseUrl: string = "http://localhost:3000/api/v1"

     api = axios.create({
        baseURL : this.baseUrl
    })

    async postApiCall(url:string,data:any){
        try {
            return await this.api.post(url, data);
        }catch (err){
            console.error("Failed to save", err);
            return err;
        }
    }
    async putApiCall(){

    }
    async deleteApiCall(){

    }
    async getApiCall(){

    }
}
const Api_call = new ApiCall();
export default Api_call;
