import Joi from 'joi'
import { userSchema } from '../validations.js'

let users = []

export const getUsers = (req, res) => {
    res.send(users)
}

export const createUser = async (req, res, next) => {

    try{
        const user = await userSchema.validateAsync(req.body)
        
        users.push(user)
        
        res.status(200).send(`User ${user.name} added to the database!`)
    } catch (error) {
        if (error.isJoi === true ) error.status = 422 && res.send(error.message)

            next(error)
    }
    console.log(error.isJoi);
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
    const { name, phone, email, birthDate } = req.body

    const user = users.find((user) => user.cpf === cpf)

    if(name) user.name = name
    if(phone) user.phone = phone
    if(email) user.email = email
    if(birthDate) user.birthDate = birthDate

    res.send(`User with the CPF ${cpf} has been update`)
}

export const updatePutUser = (req, res) => {
    const { cpf } = req.params

    const foundUser = users.findIndex((user) => user.cpf === cpf)

    if (foundUser){
        const user = req.body
        user.push(user)

        res.status(200).send(`User ${user.name} has been update!`)
    } else {
        res.status(404).json({ message: "This CPF you are looking for does not exist" })        
    }
}