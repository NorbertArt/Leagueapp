import{Model}from'objection'
import knex from'../config/database'
import Players from './players';


Model.knex(knex)
class Team extends Model{
  static get tableName(){
    return'team'
    }      
    static get relationMappings(){
      return{
        Players:{
          relation: Players.HasManyRelation,
          modelClass:Players,
          join:{
            from:'team.Druzyna',
            to:'players.Team'
          }
        },
      }
    }             
 }
 
export default Team
                 