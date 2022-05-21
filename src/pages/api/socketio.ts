import { NextApiRequest } from 'next'

import { NextApiResponseServerIO } from '../../types'
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
        io.on('connection', (socket) => {
            const { userId, userName, gameId } = socket.handshake.query
            console.log(`>> a user connected ${userName}:${userId} to ${gameId}`)

            socket.broadcast.emit('a user connected', `${userName}:${userId}`)
            socket.on('hello', (msg) => {
                socket.emit('hello', `${userName}:${userId}`)
            })
            socket.on('disconnect', (event) => {
                socket.broadcast.emit('a user disconnected', `${userName}:${userId}`)
                console.log('>> user disconnected', event)
            })
        })

        // append SocketIO server to Next.js socket server response
        res.socket.server.io = io
    }
    res.end()
}
