import { Request, Response } from 'express';
import { prisma } from '../../database/prismaClient';

// Creates a new artist.
async function createArtist(request: Request, response: Response) {
      const { name, email } = request.body;

      const exist = await prisma.artist.findFirst({
            where: {
                  name: {
                        equals: name,
                        mode: 'insensitive',
                  },
            },
      });
      
      if (exist) {
            throw new Error('Artist already exists');
      }
                
      const result = await prisma.artist.create({
            data: {
                  name,
                  email,
            },
      })
      response.json({
            success: true,
            payload: result,
      })
}

  
// Get all Artist.
async function getArtists(request: Request, response: Response) {
      const artists = await prisma.artist.findMany();
  
      return response.json(artists);
}

export { createArtist, getArtists };

