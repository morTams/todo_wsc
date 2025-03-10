
export function validateObject(obj:Object, reqFields: Array<string> ){
    for(let field of reqFields){
        if(!(field in obj))
            return false
    }
    return true
}