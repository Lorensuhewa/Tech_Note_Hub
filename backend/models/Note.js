import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minLength: [3, "Title must be at least 3 characters long"],
            maxLength: [100, "Title must be less than 100 characters long"],
        },

        content:{
            type: String,
            required: [true, "Content is required"],
            trim: true,
            minLength: [1, "Content must be at least 1 characters long"],
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Note = mongoose.model('Note', noteSchema);

export default Note;