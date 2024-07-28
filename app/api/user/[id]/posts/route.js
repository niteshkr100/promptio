import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

// with params we get id  number of file route and with dot notation params.id get [id] number
export const GET = async(request, {params})=>{
     

    try{
        await connectToDB();

        const prompts = await Prompt.find({creator: params.id}).populate('creator');
      
        return new Response(JSON.stringify(prompts), {status: 200})

    }catch(error){
        return new Response("Failed to catch prompts", {status: 500})
    }
}