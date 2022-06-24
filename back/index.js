import mysql from 'mysql'
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import path from 'path'
import multer from 'multer'
import Leagues from './src/models/League'
import Teams from './src/models/Team'
import knex from'./src/config/database'
import Players from './src/models/players';

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))
	
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../front/public/image', 'Blog'),
    filename: function (req, file, cb) {   
        cb(null, file.originalname )  
    }
})
const Team = multer.diskStorage({
    destination: path.join(__dirname, '../front/public/image', 'Team'),
    filename: function (req, file, cb) {   
        cb(null, file.originalname )  
    }
})
const credentials = {
	host: 'localhost',
	user: 'root',
	password: 'Limanowska',
	database: 'users'
}

app.post('/api/login', (req, res) => {
	const { username, password } = req.body
	const values = [username, password]
	var connection = mysql.createConnection(credentials)
	connection.query("SELECT * FROM admin WHERE username = ? AND password = ?", values, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.length > 0) {
				res.status(200).send({
					"id": result[0].id,
					"user": result[0].user,
					"username": result[0].username
				})
			} else {
				res.status(400).send('User nie istnieje')
			}
		}
	})
	connection.end()
})
app.use(express.json())
app.post('/Blog', (req, res) =>{
	const Title = req.body.Title;
	const Content = req.body.Content
	const image = req.body.image
	const Dates = new Date()
	const Month = Dates.getMonth()+1

	const Time = Dates.getDate() + "-" + Month + "-" + Dates.getFullYear() + " " + Dates.getHours() + ":" + Dates.getMinutes()
	var db = mysql.createConnection(credentials)
	db.query(
		"INSERT INTO blog (Title,Content ,Image ,Time) VALUES (?,?,?,?)",
		[Title , Content ,image,Time],
		(err, result)=>{
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	}
	)
	
})
app.post('/imageupload', async (req, res) => {	
    try {
        let upload = multer({ storage: storage}).single('avatar');

        upload(req, res, function(err) {
            if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
        }); 

    }catch (err) {console.log(err)}
})
app.post('/imageupload/Team', async (req, res) => {	
    try {
        let upload = multer({ storage: Team}).single('avatar');

        upload(req, res, function(err) {
            if (!req.file) {
                return res.send('Wybierz zdjęcie do wrzucenia');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
        }); 

    }catch (err) {console.log(err)}
})
app.delete('/imageupload/Team/delate/:image', async (req, res) => {	
	const image = req.params.image
	var fs=require('fs');
			var filePath='../front/public/image/Team/' + image;

			fs.unlink(filePath,deleteFileCallback);

				function deleteFileCallback(error){
    				if(error){console.log('Error in deleting file');
					console.log(error.message);} else{console.log('Deleted Successfully ..');}									 
					}    
})
app.delete('/imageupload/delate/:image', async (req, res) => {	
	const image = req.params.image
	var fs=require('fs');
			var filePath='../front/public/image/Blog/' + image;

			fs.unlink(filePath,deleteFileCallback);

				function deleteFileCallback(error){
    				if(error){console.log('Error in deleting file');
					console.log(error.message);} else{console.log('Deleted Successfully ..');}									 
					}    
})
app.get('/Blog' , (req , res) =>{
	var db = mysql.createConnection(credentials)
	db.query(
		"SELECT * FROM blog", (err, result)=>{
			if(err){
				console.log(err)
			}else{
				res.send(result)
			}
		}
	)
})
app.get('/Blog/post/getFromId/:id' , (req , res) =>{
	var db = mysql.createConnection(credentials)
	const id = req.params.id
	db.query(
		"SELECT * FROM blog WHERE id=?", id ,(err, result)=>{
			if(err){
				console.log(err)
			}else{
				res.send(result)
			}
		}
	)
})
app.delete('/Blog/delete/:id',(req,res)=>{
	const id= req.params.id
	var db = mysql.createConnection(credentials)
	db.query("DELETE FROM blog WHERE id=?",id, (err , result)=>{
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	} )})
app.post('/Incoming', (req, res) =>{
	const Team1 = req.body.Team1;
	const Team2 = req.body.Team2;
	const Date =req.body.Date;
	var db = mysql.createConnection(credentials)
	db.query(
		"INSERT INTO incoming (Druzyna1,Druzyna2,Data) VALUES (?,?,?)",
		[Team1,Team2,Date],
		(err, result)=>{
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	}
	)
})
app.get('/Incoming' , (req , res) =>{
	var db = mysql.createConnection(credentials)
	db.query(
		"SELECT * FROM incoming",(err, result)=>{
			if(err){
				console.log(err)
			}else{
				res.send(result)
			}
		}
	)
})
app.delete('/Incoming/delete/:id',(req,res)=>{
	const id= req.params.id
	var db = mysql.createConnection(credentials)
	db.query("DELETE FROM incoming WHERE id=?",id, (err , result)=>{
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	} )})
app.get('/LastMatch' , (req , res) =>{
	var db = mysql.createConnection(credentials)
	db.query(
		"SELECT * FROM lastmatch",(err, result)=>{
			if(err){
				console.log(err)
			}else{
				res.send(result)
			}
		}
	)
})
app.post('/LastMatch', (req, res) =>{
	const Team1 = req.body.Team1;
	const score =req.body.score
	const Team2 = req.body.Team2;
	var db = mysql.createConnection(credentials)
	db.query(
		"INSERT INTO lastmatch (Druzyna1,Wynik,Druzyna2) VALUES (?,?,?)",
		[Team1,score,Team2],
		(err, result)=>{
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	}
	)
})
app.delete('/LastMatch/delete/:id',(req,res)=>{
	const id= req.params.id
	var db = mysql.createConnection(credentials)
	db.query("DELETE FROM lastmatch WHERE id=?",id, (err , result)=>{
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	} )})
app.get('/Team' , async(req,res)=>{
	const Team = await Teams.query().orderByRaw('team.Punkty');
	res.send(Team)
})
app.get('/Team/Players' , async(req,res)=>{
	const players = await Teams.query().withGraphFetched('Players')
	res.send(players)
})
app.get('/Players' , async(req,res)=>{
	const Playerss = await Players.query()
	res.send(Playerss)
})
app.get('/Team/Players/getFromId/:id' , async(req , res) =>{
	const id = req.params.id
	const TeamPlayers = await Teams.query().where({id:id}).withGraphFetched('Players')
	res.send(TeamPlayers)
})
app.post('/Players', async(req, res) =>{
	const Name = req.body.Name;
	const Position = req.body.Position;
	const Number = req.body.Number;
	const Team = req.body.Team;

	const Player = await Players.query().insert({
		Nazwa:Name,
		Pozycja:Position,
		nr:Number,
		Team:Team 
	})
	
})
app.delete('/Players/delete/:id',(req,res)=>{
	const id= req.params.id
	var db = mysql.createConnection(credentials)
	db.query("DELETE FROM players WHERE id=?",id, (err , result)=>{
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	} )})

app.post('/Team', async(req, res) =>{
	const score = req.body.score;
	const match = req.body.match;
	const team = req.body.team;
	const Liga = req.body.Liga
	const Slug = req.body.Slug
	const image = req.body.image
	const Team = await Teams.query().insert({
		Druzyna:team,
		Mecze:match,
		Punkty:score,
		Liga:Liga,
		Slug:Slug,
		Image:image
	})
	
})
app.delete('/Team/delete/:id',(req,res)=>{
	const id= req.params.id
	var db = mysql.createConnection(credentials)
	db.query("DELETE FROM team WHERE id=?",id, (err , result)=>{
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	} )})

app.get('/League' , async(req,res)=>{
	const league = await Leagues.query()
	res.send(league)
})
app.delete('/league/delete/:id',(req,res)=>{
	const id= req.params.id
	var db = mysql.createConnection(credentials)
	db.query("DELETE FROM league WHERE id=?",id, (err , result)=>{
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	} )})

app.post('/League', (req, res) =>{
	const League = req.body.league;
	var db = mysql.createConnection(credentials)
	db.query(
		"INSERT INTO league (Nazwa_ligi) VALUES (?)",
		[League],
		(err, result)=>{
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	}
	)
})
app.get('/Table' , async(req,res)=>{
	const league = await Leagues.query().withGraphFetched('teams')
	res.send(league)
})
app.post('/imageupload', async (req, res) => {	
  
})
app.listen(4000, () => console.log('server działa na porcie 4000'))