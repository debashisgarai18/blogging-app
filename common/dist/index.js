"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInputSchema = exports.postInputSchema = exports.SignupInputSchema = exports.SigninInputSchema = void 0;
const zod_1 = require("zod");
// Schema defination
exports.SigninInputSchema = zod_1.z.object({
    username: zod_1.z.string().email({
        message: "This should be of email format / username cannot be empty",
    }),
    pwd: zod_1.z.string().min(6, { message: "Should contain minimum 6 digits" }),
});
exports.SignupInputSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    username: zod_1.z.string().email({
        message: "This should be of email format / username cannot be empty",
    }),
    pwd: zod_1.z.string().min(6, { message: "Should contain minimum 6 digits" }),
});
exports.postInputSchema = zod_1.z.object({
    title: zod_1.z.string({ message: "The title cannot be empty" }),
    content: zod_1.z.string({ message: "The contents cannot be empty" }),
    thumbnail: zod_1.z.string().optional(),
});
exports.updateInputSchema = zod_1.z.object({
    title: zod_1.z.string({ message: "The title cannot be empty" }).optional(),
    content: zod_1.z.string({ message: "The contents cannot be empty" }).optional(),
    thumbnail: zod_1.z.string().optional(),
});
