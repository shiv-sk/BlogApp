class ApiError extends Error{
    errors:any;
    statusCode:number
    status:string;
    data:null
    constructor(statusCode:number , message:string , errors = [] , status:string = "fail"){
        super(message)
        this.message = message
        this.errors = errors
        this.statusCode = statusCode
        this.data = null
        this.status = status
    }
}
export default ApiError
