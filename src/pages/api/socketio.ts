import { NextApiRequest } from 'next'

import { usersController } from '../../server/controllers'
import { NextApiResponseServerIO } from '../../types'
import { SocketEvent } from '../../utils/sockets'
import { Server as NetServer } from 'http'
import { Server as ServerIO } from 'socket.io'

export const config = {
    api: {
        bodyParser: false,
    },
}

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (!res.socket.server.io) {
        console.log('>> New Socket.io server...')
        // adapt Next's net Server to http Server
        const httpServer: NetServer = res.socket.server as any
        const io = new ServerIO(httpServer, {
            path: '/api/socketio',
        })
        io.on('connection', async (socket) => {
            const { userId, userName, gameId } = socket.handshake.query
            const roomId = `room-${gameId}`

            socket.on(SocketEvent.MESSAGE, (msg) => {
                // if we use `socket` instead of `io` we will send message to everyone except `socket`
                io.to(roomId).emit(SocketEvent.MESSAGE, `${userName}:${userId}`)
            })
            socket.on('disconnect', (event) => {
                // if we use `socket` instead of `io` we will send message to everyone except `socket`
                io.to(roomId).emit(SocketEvent.USER_DISCONNECTED, userId)
                console.log('>> user disconnected', event)
            })
            await socket.join(roomId)

            const user = await usersController.getById(userId! as string)

            console.log(`>> a user connected ${userName}:${userId} to ${roomId}`)
            socket.to(roomId).emit(SocketEvent.USER_CONNECTED, user)
        })

        // append SocketIO server to Next.js socket server response
        res.socket.server.io = io
    }
    res.end()
}
