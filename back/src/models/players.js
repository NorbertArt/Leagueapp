import{Model}from'objection'
import knex from'../config/database'


Model.knex(knex)
class Players extends Model{
  static get tableName(){
    return'players'
    }                  
 }
 
export default Players