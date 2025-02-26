import { Schema, model } from "mongoose";

const CommentSchema = Schema({
    text: {
        type: String,
        required: [true, "El texto es requerido"],
        maxLength: [1500, "El maximo permitido son 1500 caracteres"]
    },
    status: {
        type: Boolean,
        default: true
    },
    publication: {
        type: Schema.Types.ObjectId,
        ref: "publication",
        required: true,
    },
},{
    timestamps: true,
    versionKey: false
});

export default model("Comment", CommentSchema);