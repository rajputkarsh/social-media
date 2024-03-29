
import crypto from 'crypto';

export const salt = '2b$10$X4kv7j5ZcG39WgogSl16au';

export function hashPassword(password: string) : string {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export function createChatId(userId: string, friendId: string) : string {
    return userId + "_x_" + friendId;
}