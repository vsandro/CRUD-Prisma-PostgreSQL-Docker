import { Request, Response } from 'express';
import { prisma } from '../../database/prismaClient';

// Create
async function createArtist(request: Request, response: Response) {
      const { name, email } = request.body;

      const exists = await prisma.artist.findFirst({
            where: {
                  email: {
                        equals: email,
                        mode: 'insensitive',
                  },
            },
      });
      
      if (exists) {
            throw new Error('Email already exists');
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
  
// Read All
async function getArtists(request: Request, response: Response) {
      const artists = await prisma.artist.findMany();
  
      return response.json(artists);
}

// Update
async function updateArtist(request: Request, response: Response) {
      const { id } = request.params;

      const exists = await prisma.artist.findFirst({
            where: {
                  id: {
                        equals: Number(id),
                  },
            },
      });
      
      if (!exists) {
            throw new Error('Id not found');
      }

      const result = await prisma.artist.update({
            where: {
                  id: {
                        equals: id,
                  },
            },
        })
      response.json({
            success: true,
            payload: result,
      })
}

// Delete
async function deleteArtist(request: Request, response: Response) {
      const { id } = request.params;

      const exists = await prisma.artist.findFirst({
            where: {
                  id: {
                        equals: id,
                  },
            },
      });
      
      if (!exists) {
            throw new Error('Id not found');
      }

      const result = await prisma.artist.delete({
          where: { id: Number(id) },
      })
      response.json({
            success: true,
            payload: result,
      })
}

export { createArtist, getArtists, updateArtist, deleteArtist };

