import { response } from 'express';
import Publication from '../publications/publication.model.js'
import Comment from './comment.model.js'

export const createComment = async (req, res) => {
    try{
        const data = req.body;

        const publication = await Publication.findOne({ title: data.title });

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });
        }

        const comment = new Comment({
            ...data,
            publication: publication._id
        })

        await comment.save();

        res.status(200).json({
            success: true,
            comment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el comentario',
            error
        });
    }
}   

export const updateComment = async (req, res = response ) => {
    try{

        const { id } = req.params;
        const {_id, title, ...data} = req.body;

        const comment = await Comment.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            succes: true,
            msg: 'Comentario Actualizado',
            comment
        })

    }catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar el comentario',
            error
        })
    }
}

export const deleteComment = async (req, res) => {

    const { id } = req.params;

    try {

        await Comment.findByIdAndUpdate(id, { status: false });

        res.status(200).json({
            success: true,
            message: 'Comentario eliminado exitosamente'
        })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el comentario',
            error
        })
    }
}