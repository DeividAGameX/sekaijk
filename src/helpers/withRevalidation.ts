import {revalidatePath} from "next/cache";

function withRevalidation(
    paths: string[],
    fn: (...args: any[]) => Promise<any>
) {
    return async (...args: any[]) => {
        const response = await fn(...args);
        try {
            for (const path of paths) {
                await revalidatePath(path);
            }
        } catch (err) {
            console.error(err);
        }
        return response;
    };
}

export default withRevalidation;
