const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))
// const JWT = require('jsonwebtoken')
// const secretWord = 'Samus#Aran'

const credentials = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'users'
}
const league = {}
app.get('/', (req, res) => {
})

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
app.post('/league', (req, res) =>{
	const league = req.body.league;
	var db = mysql.createConnection(credentials)
	db.query(
		"INSERT INTO league (Nazwa_Ligi) VALUES (?)",
		[league],
		(err, result)=>{
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	}
	)

})
app.get('/league' , (req , res) =>{
	var db = mysql.createConnection(credentials)

	db.query(
		"SELECT Nazwa_ligi FROM league",league,(err, result)=>{
			if(err){
				console.log(err)
			}else{
				res.send(result)

			}
		}
	)
})
app.post('/team', (req, res) =>{
	const league = req.body.league;
	const Team = req.body.Team
	const match = req.body.match
	const score = req.body.score
	var db = mysql.createConnection(credentials)
	db.query(
		"INSERT INTO Team (liga,Druzyna,Mecze,punkty) VALUES (?,?,?,?)",
		[league ,Team , match ,score],
		(err, result)=>{
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	}
	)
})
app.get('/team' , (req , res) =>{
	var db = mysql.createConnection(credentials)
	db.query(
		"SELECT * FROM Team", (err, result)=>{
			if(err){
				console.log(err)
			}else{
				res.send(result)
			}
		}
	)
})

app.get('/Blog' , (req , res) =>{
	var db = mysql.createConnection(credentials)
	db.query(
		"SELECT * FROM Blog", (err, result)=>{
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
		"SELECT * FROM Blog WHERE id=?", id ,(err, result)=>{
			if(err){
				console.log(err)
			}else{
				res.send(result)
			}
		}
	)
})

app.listen(4000, () => console.log('server działa na porcie 4000'))