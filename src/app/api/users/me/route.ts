import { connect } from "@/dbConfig/dbConfig";
import Userauth from "@/models/userModel";
import {NextRequest,NextResponse} from 'next/server'
import { getDataFromToken } from "@/helpers/getDataFromToken";


connect()

export async  function POST(request:NextRequest){
        //extract data from token 
        const userId =  await getDataFromToken(request)
        const user = Userauth.findOne({_id:userId}).select("-password")

        return NextResponse.json({
            message :"userFound",
            data : user
        })
} 