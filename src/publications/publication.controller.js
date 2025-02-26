import { response } from 'express';
import User from '../users/user.model.js'
import Publication from './publication.model.js';

export const createPublication = async (req, res) => {
    try {
        const data = req.body;
       
        const user = await User.findOne({ username: data.username });

        console.log(user);

        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        const publication = new Publication({
            ...data,
            user: user._id
        });

        await publication.save();

        res.status(200).json({
            success: true,
            publication
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear la publicación',
            error
        });
    }
}   

export const getPublications = async (req, res) => {
    const { limite = 10, desde = 0} = req.query;
    const query = { status: true };

    try {
        const publications = await Publication.find(query)
            .skip(Number(desde))
           .limit(Number(limite));
        
        const PublicationsWithOwnerNames = await Promise.all(publications.map(async (publication) =>{
            const owner = await User.findById(publication.user);
            return {
               ...publication.toObject(),
                user: owner ? owner.nombre : "Usuario no encontrado"
            }
        }));

        const total = await Publication.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            publications: PublicationsWithOwnerNames
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la publicacion',
            error
        })
    }
}

export const searchPublication = async (req, res) => {

    const { id } = req.params;

    try {

        const publication = await Publication.findById(id);

        if(!publication) {
            return res.status(404).json({
                succes: false,
                message: 'Publicacion no encontrada'
        })
    }

    const owner = await User.findById(publication.user);

    res.status(200).json({
        succes: true,
        publication: {
            ...publication.toObject(),
            user: owner ? owner.nombre : 'Usuario no encontrado'
        }
    })
    
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar la publicacion',
            error
        })
    }
}

export const updatePublication = async (req, res = response) => {
    try {

        const { id } = req.params;
        const {_id, username, ...data} = req.body;

        const publication = await Publication.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            succes: true,
            msg: 'Publicacion Actualizada',
            publication
        })

    }catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la publicacion',
            error
        })
    }
}

export const deletePublication = async (req, res) => {

    const { id } = req.params;

    try {

        await Publication.findByIdAndUpdate(id, { status: false });

        res.status(200).json({
            success: true,
            message: 'Publicacion eliminada exitosamente'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la publicacion',
            error
        })
    }
}