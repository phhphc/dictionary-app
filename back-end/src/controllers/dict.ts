import { Response } from 'express'
import expressAsyncHandler from 'express-async-handler'

import Dict from '../models/dict'
import { JWTRequest } from '../middlewares/auth'
import * as cambridge from '../services/cambridge'

interface IDict {
    word?: string
    mean?: string
    detail?: any
    hideUntil?: Date
}

// @desc    Get all user dict
// @route   GET /api/dict/
// @access  Authenticate only
export const getUserDict = expressAsyncHandler(
    async (req: JWTRequest, res: Response) => {
        const dictList = await Dict.find({ owner: req.auth?.id }).select(
            'word mean detail hideUntil'
        )

        res.json(dictList)
    }
)

// @desc    Add dict to user dict list
// @route   POST /api/dict
// @access  Authenticate only
export const addUserDict = expressAsyncHandler(
    async (req: JWTRequest, res: Response) => {
        const { word, mean, detail, hideUntil }: IDict = req.body

        if (!word || mean == null || !detail) {
            res.status(400)
            throw new Error('Missing required fields')
        }

        const dict = await Dict.create({
            word,
            mean,
            detail,
            owner: req.auth?.id,
            hideUntil,
        }).catch((e) => {
            res.status(409)
            throw new Error('Word already exists')
        })

        res.status(201).json({
            _id: dict._id,
            word: dict.word,
            mean: dict.mean,
            detail: dict.detail,
            hideUntil: dict.hideUntil,
        })
    }
)

// @desc    Update user dict
// @route   PUT /api/dict/:id
// @access  Authenticate only
export const updateUserDict = expressAsyncHandler(
    async (req: JWTRequest, res: Response) => {
        const { word, mean, detail, hideUntil }: IDict = req.body

        const dict = await Dict.findOneAndUpdate(
            { _id: req.params.id, owner: req.auth?.id },
            { word, mean, detail, hideUntil },
            { new: true }
        )
            .select('word mean detail hideUntil')
            .catch(() => {
                res.status(409)
                throw new Error('Word duplicate')
            })

        if (dict) {
            res.status(200).json(dict)
        } else {
            res.status(404)
            throw new Error('Dict not found')
        }
    }
)

// @desc    Delete user dict
// @route   DELETE /api/dict/:id
// @access  Authenticate only
export const deleteUserDict = expressAsyncHandler(
    async (req: JWTRequest, res: Response) => {
        const { deletedCount } = await Dict.deleteOne({
            _id: req.params.id,
            owner: req.auth?.id,
        })

        if (deletedCount) {
            res.status(202).json({ id: req.params.id })
        } else {
            res.status(404)
            throw new Error('Dict not found')
        }
    }
)

// @desc    Autocomple search word
// @route   GET /api/dict/autocomplete?q=
// @access  Authenticate only
export const autoCompleteWord = expressAsyncHandler(
    async (req: JWTRequest, res: Response) => {
        const q = req.query.q

        if (q === undefined) {
            res.status(400)
            throw new Error('Missing required fields')
        } else if (typeof q !== 'string') {
            res.status(400)
            throw new Error('Invalid query')
        }

        const data = await cambridge.autoCompleteEngWord(q)
        res.send(data)
    }
)

// @desc    Lookup word
// @route   GET /api/dict/lookup?q=
// @access  Authenticate only
export const lookUpWord = expressAsyncHandler(
    async (req: JWTRequest, res: Response) => {
        const q = req.query.q

        if (q === undefined) {
            res.status(400)
            throw new Error('Missing required fields')
        } else if (typeof q !== 'string') {
            res.status(400)
            throw new Error('Invalid query')
        }

        const data = await cambridge.lookUpWord(q)
        const resData: IDict = {
            word: q,
            mean: '',
            detail: data,
        }
        res.send(resData)
    }
)
