import { createTables } from './queryFunctions';
import { dropTables } from './queryFunctions';

(async () => {
  await dropTables();
  await createTables();
})();