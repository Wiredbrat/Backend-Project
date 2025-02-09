import mongoose, { Schema } from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // using cloudinary URL
            required: [true, 'Video is reequired']
        },
        thumbnail: {
            type: String, // using cloudinary URL
            required: [true, 'Thumbnail is reequired']
        },
        title: {
            type: String,
            required: [true, 'Title is reequired']
        },
        description: {
            type: String,
        },
        duration: {
            type: Number, // using cloudinary
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId, // first letter always capital
            ref: 'User'
        }
    },
    {timestamps: true}
)

videoSchema.plugin(mongooseAggregatePaginate) // this is to add/write advance queries like aggregation queries

export const Video = mongoose.model('Video', videoSchema)