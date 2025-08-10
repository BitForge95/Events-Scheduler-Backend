import mongoose from "mongoose"


export async function dbConnect () {
    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("Database connected Successfully !!",db.connection.host);

    } catch (error) {
        console.error("ERR :", error);
    }
}

export default dbConnect