import express from 'express';

import { Router } from 'express';
const routes = Router();

const app = express()
app.use(express.json())

import { createArtist, getArtists } from '../src/modules/artist/Artist';

routes.post('/artist', createArtist)
routes.get('/artists', getArtists)

export { routes };