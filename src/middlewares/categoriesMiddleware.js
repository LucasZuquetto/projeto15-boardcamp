import { connection } from "../database/db.js"

export default async function categoriesMiddleware (req,res,next){
    const {name} = req.body

    if(!name){
        res.sendStatus(400)
        return
    }

    const categorieExists = await connection.query('SELECT * FROM categories WHERE name=$1;',[name])
    if(categorieExists){
        res.sendStatus(409)
        return
    }
    next()
}