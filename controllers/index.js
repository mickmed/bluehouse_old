// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const { Item, User } = require('../models')

// const SALT_ROUNDS = 11
// const TOKEN_KEY = 'areallylonggoodkey'

// const signUp = async (req, res) => {
//   // INSERT CODE HERE
// }

// const signIn = async (req, res) => {
//   // INSERT CODE HERE
// }

// const changePassword = async (req, res) => {}

const createItem = async (req, res) => {
	try {
		console.log('req.body:', req.body)
		const createdItem = await Item.create(req.body)

		return res.status(201).json({
			item: {
				createdItem
			}
		})
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: error.message })
	}
}

const getAllItems = async (req, res) => {
	try {
		const items = await Item.findAll()
		return res.status(200).json({ items })
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const getItemById = async (req, res) => {
	try {
		const { id } = req.params
		const item = await Item.findOne({
			where: { id: id }
		})
		if (item) {
			return res.status(200).json({ item })
		}
		return res.status(404).send('Item with the specified ID does not exists')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const updateItem = async (req, res) => {
	try {
		const { id } = req.params
		const { item } = req.body
		const [updated] = await Item.update(item, {
			where: { id: id }
		})
		if (updated) {
			const updatedItem = await Item.findOne({ where: { id: id } })
			return res.status(202).json({ item: updatedItem })
		}
		throw new Error('Item not found')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const deleteItem = async (req, res) => {
	try {
		const { id } = req.params
		const deleted = await Item.destroy({
			where: { id: id }
		})
		if (deleted) {
			return res.status(202).send('Item deleted')
		}
		throw new Error('Item not found')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	// signUp,
	// signIn,
	// changePassword,
	createItem,
	getAllItems,
	getItemById,
	updateItem,
	deleteItem
}
