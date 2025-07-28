import { createPool } from 'mysql2/promise';
import c from 'config';

export const db = await createPool({
    port: c.get("DB_PORT"),
    user: c.get("DB_USERNAME"),
    password: c.get("DB_PASSWORD"),
    host: c.get("DB_HOST"),
    database: c.get("DB_DATABASE"),
    queueLimit: 20
})

export const fetchQuery = async (query, type=false, ...params) => {
    try {
        if(type) {const[[result]] = await db.query(query, params); return result;}
        else {const [result] = await db.query(query, params); return result;}
    } catch (error) {
        if(error.code = "PROTOCOL_CONNECTION_LOST" || error.fatal) {console.log('DB FATAL ERROR',    error);  return db.destroy();}
        else console.log("DB error", error);        
    }
}

export const transaction = async (callback, res) => {
    const conn = await db.getConnection();
    try{
        await conn.beginTransaction();
        const result = await callback(conn);
        await conn.commit();
        return result;
    }catch(err){
        if(err.code == "PROTOCOL_CONNECTION_LOST" || err.fatal){
            console.log("DB connection error:", err.message)
           return db.destroy()
        } else console.log("DB error", err.message)
        await conn.rollback();
        console.log(err.status);
        
        return res.json({message: err.message})
    }finally{
        conn.release();
    }
};