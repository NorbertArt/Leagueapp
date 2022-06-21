import {Model} from 'objection'
import knex from'../config/database'
import Team from './Team'

Model.knex(knex)
class Leagues extends Model{
    static get tableName(){
      return 'league'
    }
    static get relationMappings(){
      return{
        teams:{
          relation: Team.HasManyRelation,
          modelClass:Team,
          join:{
            from:'league.Nazwa_ligi',
            to:'team.Liga'
          }
        },
      }
    }  
  
  }
  export default Leagues