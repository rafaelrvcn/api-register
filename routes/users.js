import express from 'express'
import { createUser, deleteUser, getUser, getUsers, updateUser, updatePutUser, getLogin, verifyJWT } from '../controllers/user.js'

const router = express.Router()

router.get('/', getUsers)

router.get('/:cpf', verifyJWT, getUser)

router.post('/', createUser)

router.post('/login', getLogin)

router.delete('/:cpf', verifyJWT, deleteUser)

router.patch('/:cpf', verifyJWT, updateUser)

router.put('/:cpf', verifyJWT, updatePutUser)

export default router