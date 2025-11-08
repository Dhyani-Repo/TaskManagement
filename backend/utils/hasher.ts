import bcrypt from "bcrypt"

const hashPassword = async(password:string) => {
    try{
        const saltRounds = Number(process.env.BCRYPT_SALT) || 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("hashedPassword : ",hashPassword)
        return hashedPassword
    }catch(error:any){
        console.error(error)
        throw new Error(error)
    }
}

const veryfyPassword = async(password:string,hashedPassword:string) => {
    try{
        const isMatch = await bcrypt.compare(password, hashedPassword);
    }catch(error:any){
        console.error(error)
        throw new Error(error)
    }
    
}
export {
    hashPassword
}