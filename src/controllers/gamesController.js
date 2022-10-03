import { connection } from "../database/db.js"

async function getGames (req,res){
    const {name} = req.query
    try {
        if(!name){
            const games = (await connection.query('SELECT * FROM games;')).rows
            res.send(games)
        }else{
            const games = (await connection.query('SELECT * FROM games WHERE name LIKE LOWER($1);',[`${name}%`])).rows
            res.send(games)
        }
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }
}
async function postGames (req,res){
    
}

export{getGames, postGames}