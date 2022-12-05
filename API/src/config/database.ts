import { connect } from "mongoose";

class Database {
    async init() {
        const MONGO_DB = process.env.DATABASE || "mongodb+srv://localhost:27017/iot-garden";
        try {
            await connect(MONGO_DB);
            const dbName = MONGO_DB.split("/").pop();
            console.log("=============DATABASE=============");
            console.log("STATUS: ONLINE");
            console.log("DATABASE: ",(dbName as string));
            console.log("===================================");

        } catch (error) {
            console.log("=============DATABASE=============");
            console.log("STATUS: OFFLINE");
            console.log("===================================");
        }
    }
}

export default Database;