import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref : 'User' //one to many realtionship means user can create may prompts
    },
    prompt:{
        type:String,
        required: [true, 'Prompt is required'],
    },
    tag:{
        type:String,
        required: [true, 'Tag is required'],
    },
})


const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;