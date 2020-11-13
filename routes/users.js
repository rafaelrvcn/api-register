import express from 'express'
import { createUser, deleteUser, getUser, getUsers, updateUser, updatePutUser } from '../controllers/user.js'

const router = express.Router()

router.get('/', getUsers)

router.post('/', createUser)

router.get('/:cpf', getUser)

router.delete('/:cpf', deleteUser)

router.patch('/:cpf', updateUser)

router.put('/:cpf', updatePutUser)

export default router