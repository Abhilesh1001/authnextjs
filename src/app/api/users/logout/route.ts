import {NextRequest,NextResponse} from 'next/server'


export async function POST(request:NextRequest){
    try {

        const response =  NextResponse.json({
            message : 'Logout Successfully',
            success : true
        })

        response.cookies.set('token','',{
            httpOnly:true,
            expires:new Date(0)     
        })

        return response

    }catch(errro:any){
        return NextResponse.json({'message':errro.message,success : false},{status : 200})
    }


}