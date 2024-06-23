export default function handler(req, res) {
    if (req.method === 'GET') {
        const { task_id } = req.query;
        const handler = ongoingTasks[task_id];

        if (!handler) {
            res.status(404).json({ detail: 'Task not found' });
            return;
        }

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const onToken = (token) => {
            res.write(`data: ${token.replace(/\n/g, '\n\n')}\n\n`);
        };

        const onEnd = () => {
            res.end();
        };

        handler.eventEmitter.on('token', onToken);
        handler.eventEmitter.on('end', onEnd);

        req.on('close', () => {
            handler.eventEmitter.removeListener('token', onToken);
            handler.eventEmitter.removeListener('end', onEnd);
        });
    } else {
        res.status(405).json({ detail: 'Method Not Allowed' });
    }
}
