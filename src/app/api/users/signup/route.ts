import { connect } from "@/dbConfig/dbConfig";
import Userauth from "@/models/userModel";
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    console.log('ok')
     try{
        const  {username,email,password} = await request.json()
            //validation 
            console.log(username,email,password)

            const user = await Userauth.findOne({email})
            
            if(user){
                return NextResponse.json({error:'User already exist'},{status:400})

            }
            
            const salt = await bcryptjs.genSalt(10);
            const hashpassword =  await bcryptjs.hash(password,salt)
            const newUser = new Userauth({
                username : username,
                email,
                password:hashpassword
            })
            console.log(newUser)

            const saveUser = await newUser.save() 

            console.log(saveUser)

            // //send verification email 
            await sendEmail({email,emailType:"VERIFY",userId:saveUser._id})

            return NextResponse.json({
                message : "User Register Successfully"
            })

     }catch(error:any){
        return NextResponse.json({error :error.message})

     }
}