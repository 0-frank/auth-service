import e from "express";
import mongoose from "mongoose";
import { type } from "node:os";

const userScame = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }]
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('User', userScame);