
import 'express'; // Ensure Express types are loaded

declare global {
    namespace Express {
        interface Request {
            auth: () => { userId: string, has: any };
            plan?: string;
            free_usage?: number;
            has: (params: { plan: string }) => Promise<boolean> | boolean;

        }
    }
}

