import path from "path";
import c from "config";

export const serverConfig = {
    PORT: c.get("PORT") || 30000,
    TOKEN_KEY: c.get('TOKEN_KEY'),
    publicPath: () => path.join(process.cwd(), 'public'),
    viewsPath: () => path.join(process.cwd(), 'src', 'views'),
}