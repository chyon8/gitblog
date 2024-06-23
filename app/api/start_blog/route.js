import { ChatMistralAI, MistralAI } from '@langchain/mistralai';
import { BaseCallbackHandler } from 'langchain/callbacks/base';
import { PromptTemplate } from 'langchain/prompts';
import { EventEmitter } from 'events';

const ongoingTasks = {};

class ChatCallbackHandler extends BaseCallbackHandler {
    constructor(taskId) {
        super();
        this.eventEmitter = new EventEmitter();
        this.taskId = taskId;
    }

    async onLLMStart() {}

    async onLLMEnd() {
        this.eventEmitter.emit('end');
        delete ongoingTasks[this.taskId];
    }

    async onLLMNewToken(token) {
        this.eventEmitter.emit('token', token);
    }
}

const prompt = PromptTemplate.fromTemplate(
    `
    Based on {topic} and {commit_msg}, give me ONLY one line of title for a technical blog post in a style of {postType}. Make in markdown format and then end the generation.
    Make sure the whole thing is in {lang} and not other languages whatsoever.
    `
);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { text, commitMsg, lang, postType } = req.body;

            const taskId = `${Object.keys(ongoingTasks).length}`;
            const handler = new ChatCallbackHandler(taskId);
            ongoingTasks[taskId] = handler;

            const llm = new MistralAI({
                model: 'mistral:latest',
                temperature: 0.1,
                streaming: true,
                callbacks: [handler],
            });
            const chain = prompt.chain(llm);

            chain.invoke({
                topic: text,
                postType,
                lang,
                commit_msg: commitMsg,
            });

            res.status(200).json({ taskId });
        } catch (error) {
            res.status(500).json({ detail: error.message });
        }
    } else {
        res.status(405).json({ detail: 'Method Not Allowed' });
    }
}
