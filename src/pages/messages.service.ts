import axios from "axios";
import {config} from "../config";
import {ProductI} from "./product.service";

export interface FeedbackI{
    id:number, username: string, phoneNumber: string, text:string
}

export interface OrderI{
    id: number;
    phoneNumber: string;
    customerName: string;
    address: string;
    cost: number;
    description: string;
    products: ProductI[];
    status: boolean;
}

export const changeFeedbackStatus = async ({id, status}: {id: number, status: boolean}) => {
    return await axios.put<FeedbackI>(`${config.host}:${config.api_port}/${config.endpoints.feedback}/change-status` , {id, status})
}

export const changeOrderStatus = async ({id, status}: {id: number, status: boolean}) => {
    return await axios.put<OrderI>(`${config.host}:${config.api_port}/${config.endpoints.order}/change-status` , {id, status})
}

export const getFeedbacksList = async () => {
   return  await axios.get<FeedbackI[]>(`${config.host}:${config.api_port}/${config.endpoints.feedback}`)
}

export const getOrdersList = async () => {
    return await axios.get<OrderI[]>(`${config.host}:${config.api_port}/${config.endpoints.order}`)
}