import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);

dotenv.config({ path: path.resolve(path.dirname(filename), '..', '.env') });

export default dotenv;
