const express = require('express');
const OngController = require('./controllers/ongs_controller')
const IncidentController = require('./controllers/incidents_controller')
const ProfileController =  require('./controllers/profile_controller')
const SessionController = require('./controllers/session_controller')
const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.post('/session', SessionController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;