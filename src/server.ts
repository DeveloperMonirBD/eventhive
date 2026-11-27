import app from './app';
import { initDB } from './config/db';
import config from './config/env';

const port = config.port;

async function main() {
    try {

        await initDB()
        app.listen(port, () => {
            console.log(`Eventhive app listening on port ${port}`);
        });
    } catch (error) {
        console.error(`An error occurred during startup:`, error);
        process.exit(1);
    }
}

main();
