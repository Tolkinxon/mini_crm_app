const host = 'localhost'
const PORT = process.env.PORT || 4000

const pgConfig = {
	user: 'postgres',
	host: 'localhost',
	password: '2303',
	database: 'student_score',
	port: 5432
}

const secretTokenKey = 'SECRET'

const cookieExpireTime = 1000 * 60 * 60

module.exports = { 
	cookieExpireTime,
	secretTokenKey,
	pgConfig,
	PORT,
	host,
}