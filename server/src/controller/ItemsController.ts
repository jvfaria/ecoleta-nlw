import { Request, Response } from 'express';
import connection from '../database/connection';

class ItemsController {
    // Retorna um get de todos itens existentes tabela Items
    async index(request: Request, response: Response) {
        const items = await connection('items').select("*");

        const serializedItems = items.map(item => {
            return {
                id: item.id,
                image: `http://localhost:3333/tmp/${item.image}`,
                title: item.title
            }
        });
        return response.json(serializedItems);
    } //end index 
}

export default ItemsController;