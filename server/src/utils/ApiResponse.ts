class ApiResponse <T = Record<string , any>>{
    readonly statusCode:number;
    readonly message:string;
    readonly status:string;
    readonly data:T;
    constructor(statusCode:number , message:string , data:T , status = "success"){
        this.statusCode = statusCode
        this.message = message 
        this.data = data
        this.status = status
    }
}

export default ApiResponse;