import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'


export const sendEmail = async({email,emailType,userId}:any) =>{
    try{

        // TODO : configure mail for usage 
       const hashToken = await bcryptjs.hash(userId.toString(),10)

        if (emailType ==="VERIFY"){
            await User.findByIdAndUpdate(userId,{$set :{
                verifyToken : hashToken,
                verifyTokenExpire : Date.now() + 3600000
            }
                
            })
        }else if(emailType ==="RESET"){
            await User.findByIdAndUpdate(userId,{$set :{
                forgotPasswordToken : hashToken,
                forgotPasswordTokenExpierd : Date.now() + 3600000
            }
               
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 587,
            auth: {
              user: "428d8c0d382ccf", //
              pass: "6a4608eb7a7a95" //
            }
          });


       const mailOption =  {
            from: 'abhilesh925@gmail.com', 
            to: 'abhilesh925@gmail.com', 
            subject: emailType==='VERIFY'?"Verify your email":"Reset YOur Password", 
            html: `<p> 
                Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to ${emailType==="VERIFY" ? "Verify your email":"reset your email"}
                or copy or pase the link below 
                <br>    ${process.env.DOMAIN} /verifyemail?token=${hashToken}       
            </p>`, // html body
          }
        const mailResponse  = await transport.sendMail(mailOption)
        console.log(mailResponse)
          

    }catch(error:any){
        throw new Error(error.message)
    }

}