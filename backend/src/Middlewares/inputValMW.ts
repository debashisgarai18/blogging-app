import {z} from "zod"

const inputSchema =z.object({
    fname : z.string(),
    lname : z.string(),

}) 

export const inpuValidationMiddleware = (c : any, next : any) => {

}