import users from '../data/user.json'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv-safe'
import Joi from 'joi'
import { userSchema } from '../validations.js'

const dotenvConfig = dotenv.config()

export const verifyJWT = (req, res, next) => {

    const token = req.headers['x-access-token']
    if (!token) return res.status(401).json({ auth: false, 
        message: "No token provided." })

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) return res.status(500).json({ auth: false, 
            message: "Failed to authenticate token." })

        req.cpf = decoded.cpf
        next()
    })
    
}

export const getUsers = (req, res) => {
    res.send(users)
}

export const createUser = (req, res) => {

    const { name, phone, cpf, email, birthDate, password } = req.body

    users.push({ name, phone, cpf, email, birthDate, password })

    fs.writeFile("./data/user.json", JSON.stringify(users, null, 2), (error) => {
        if (error) return res.status(error.status).json({
            error: {
                message: "Something when wrong while registering the user",
                name: error.name
            }
        })
        return res.json({ name, phone, cpf, email, birthDate, password })
    })
}

export const getLogin = (req, res) => {

    const { cpf, password } = req.body
    const foundUser = users.find(user => user.cpf == cpf && user.password == password)

    if(foundUser) {
        const token = jwt.sign({cpf}, process.env.SECRET, {expiresIn: 300})

        return res.json({ auth: true, token: token })
    }

    res.status(401).json({ message: "Invalid login" })

}

export const getUser = (req, res) => {

        const { cpf } = req.params
        
        const foundUser = users.find((user) => user.cpf === cpf)

        if(!foundUser) {
            res.status(400).send('Usuário não encontrado.')
        } else {
            res.status(200).send(foundUser)
        }
}

export const deleteUser = (req, res) => {
    const { cpf } = req.params

    const deleteUser = users.find((user) => user.cpf === cpf)

    if (deleteUser) {

        users = users.filter((user) => user.cpf !== cpf)
        res.send(`User with the cpf ${cpf} deleted from the database`)
    
    }  else {
        res.status(404).json({ message: "This CPF you are looking for does not exist"})
    }
}

export const updateUser = (req, res) => {
    const { cpf } = req.params
    const { name, phone, email, birthDate, password } = req.body

    const user = users.find((user) => user.cpf === cpf)

    if(name) user.name = name
    if(phone) user.phone = phone
    if(email) user.email = email
    if(birthDate) user.birthDate = birthDate
    if(password) user.password = password

    res.send(`User with the CPF ${cpf} has been update`)
}

export const updatePutUser = (req, res) => {

    const userFound = users.find(user => user.cpf == req.params.cpf)
    if (!userFound) return res.status(404).json({error: { message: "CPF not found"}})

    const user = {
        ...userFound,
        ...req.body
    }

    users[users.cpf - 1] = user

    return res.json(user)

}