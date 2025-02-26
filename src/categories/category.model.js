import { Schema, model } from "mongoose";

const CategorySchema = Schema ({
    type: {
        type: String,
        enum: ["NUEVO", "TENDENCIA"]
    }
})