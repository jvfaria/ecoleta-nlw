import connection from '../database/connection';
import { Request, Response, query } from 'express';
import Knex from 'knex';


class PointsController {

    // LIST POINTS
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));
        const points = await connection('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*')

        return response.json(points);

    }
    // SHOW POINT BY ID
    async show(request: Request, response: Response) {
        const { id } = request.params
        const points = await connection('points')
            .where('id', id);

        if (!points) {
            return response.status(400).json("NOT FOUND")
        }

        const items = await connection('items')
            .join('point_items', 'items.id', 'point_items.item_id')
            .where('point_items.point_id', id);

        return response.status(200).json({ points, items });

    } //


    // CREATE POINT
    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items = []
        } = request.body;

        // Transaction 
        const trx = await connection.transaction();

        const point = {
            image: "image-fake",
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            uf,
            city,
        }
        const ids = await trx('points').insert(point);
        
        // Insere na tabela point_items
        const point_id = ids[0]; // id retornado do insert em points

        const pointItems = items.map((item_id: Number) => {
            return {
                item_id,
                point_id,
            }
        });

        await trx('point_items').insert(pointItems); // insere em point_items
        trx.commit() // commit
        response.json({
            id: point_id,
            ...point // percorre objeto point e retorna resposta em json
        })
    }

    
}

export default PointsController;
