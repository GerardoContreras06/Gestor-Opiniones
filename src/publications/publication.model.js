import { Schema, model } from "mongoose";

const PublicationSchema = Schema({
    title: {
        type: String,
        required: [true, "El título es requerido"],
        maxLength: [100, "El máximo permitido son 100 caracteres"]
    },
    content: {
        type: String,
        required: [true, "El contenido es requerido"],
        maxLength: [1000, "El máximo permitido son 1000 caracteres"]
    },
    status: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        requited: [true, "La categoria es requerida"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model("Publication", PublicationSchema);