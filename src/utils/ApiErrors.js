class ApiErrors {
    constructor(
        statusCode,
        message = " Internal Server Error",
        stack = '',
        errors = []
    ) { // default values for the constructor
        super(message)
        this.statusCode = statusCode
        this.errors = errors
        this.success = false
        this.data = null
        
        if(stack) {
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiErrors };