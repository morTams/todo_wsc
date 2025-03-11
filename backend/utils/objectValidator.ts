
export function validateObject(obj:Record<string, any>, reqFields: Array<string> ){
    for(let field of reqFields){
        if(!(field in obj) || obj[field] === undefined || obj[field] === null || obj[field] === "")
            return false
    }
    return true
}