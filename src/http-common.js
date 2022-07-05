import axios from "axios";
import { address } from "./Asset/Constant/APIConstant"

export default axios.create({
    baseURL: address
});