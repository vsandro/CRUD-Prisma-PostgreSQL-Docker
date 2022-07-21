import express from 'express';

import { Router } from 'express';
const routes = Router();

const app = express()
app.use(express.json())

import { createArtist, deleteArtist, getArtists, updateArtist } from '../src/modules/artist/Artist';

routes.post('/artist', createArtist)
routes.get('/artists', getArtists)
routes.put('/artists/:id', updateArtist)
routes.delete('/artists/:id', deleteArtist)

export { routes };
