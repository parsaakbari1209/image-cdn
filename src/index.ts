import { Hono } from 'hono'

//---------------------//
//       Bindings      //
//---------------------//

type Bindings = {
    IMAGES_BUCKET: R2Bucket
}

//---------------------//
//        Server       //
//---------------------//

const server = new Hono<{ Bindings: Bindings }>()

//---------------------//
//        Routes       //
//---------------------//

// Retrieve an image.
server.get('/images/:key', async (c) => {
    const key = c.req.param('key')
    try {
        const objectBody = await c.env.IMAGES_BUCKET.get(key)
        if (objectBody === null) {
            return c.json({ "error": "image not found" })
        }
        return c.newResponse(await objectBody.arrayBuffer(), 200, {'Content-Type': 'application/octet-stream'})
    } catch (err: any) {
        return c.json({ "error": err?.message })
    }
})

// Store an image.
server.put('/images/:key', async (c) => {
    const key = c.req.param('key')
    try {
        await c.env.IMAGES_BUCKET.put(key, (await c.req.parseBody())['image'])
        return c.json({})
    } catch (err: any) {
        return c.json({ "error": err?.message })
    }
})

// Delete an image.
server.delete('/images/:key', async (c) => {
    const key = c.req.param('key')
    try {
        await c.env.IMAGES_BUCKET.delete(key)
        return c.json({})
    } catch (err: any) {
        return c.json({ "error": err?.message })
    }
})

export default server
