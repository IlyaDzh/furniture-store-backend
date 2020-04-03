import mongoose, { Schema, Document } from "mongoose";

export interface IFactory extends Document {
    about: {
        text: Array<string>;
        gallery_types: Array<string>;
        gallery: Array<string>;
        stages: Array<{ title: string; stage: string }>;
    };
    service: {
        payment: Array<{ title: string; content: string }>;
        delivery: Array<{ title: string; content: string }>;
    };
    contacts: {
        number: Array<string>;
        email: Array<string>;
        time: Array<string>;
        address_office: Array<string>;
        address_prod: Array<string>;
    };
}

const FactorySchema = new Schema({
    about: {
        text: [String],
        gallery_types: [String],
        gallery: [String],
        stages: [
            {
                title: String,
                stage: String
            }
        ]
    },
    service: {
        payment: [
            {
                title: String,
                content: String
            }
        ],
        delivery: [
            {
                title: String,
                content: String
            }
        ]
    },
    contacts: {
        number: [String],
        email: [String],
        time: [String],
        address_office: [String],
        address_prod: [String]
    }
});

const FactoryModel = mongoose.model<IFactory>("Factory", FactorySchema);

export default FactoryModel;
