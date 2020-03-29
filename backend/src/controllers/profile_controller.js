const connectio = require('../database/connection')

module.exports = {

    async index(request, response){
        const ong_id = request.headers.authorization;

        const incidents = await connectio('incidents')
        .where('ong_id',ong_id)
        .select('*');

        if(incidents){
            return response.json(incidents);
        }

        return response.status('204');

    }


}