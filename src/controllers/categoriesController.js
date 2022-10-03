import { connection } from "../database/db.js"

async function getCategories(req,res){
    try {
        const categories = (await connection.query('SELECT * FROM categories')).rows
        res.send(categories)
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }
} 

async function postCategories (req,res){
    return
}

export {
    postCategories,
    getCategories
}