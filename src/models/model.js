import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on('error',(err, client) => `Error, ${err}, on client ${client}` );
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} from ${this.table}`;
    if (clause) query += clause;
    console.log(query);
    return this.pool.query(query);
  }

  async insert(columns, values) {
    const query = `INSERT INTO ${this.table}(${columns})
        VALUES(${values})
        RETURNING id, ${columns}`;
    return this.pool.query(query);
  }

  async update(updateQueryValues, clause) {
    let query = `UPDATE ${this.table}
                  SET ${updateQueryValues}`;
    console.log(query);
    if (clause) query += clause;
    console.log(query);
    return this.pool.query(query);
  }

  async delete(clause) {
    let query = `DELETE from ${this.table}`;
    console.log(query);
    if (clause) query += clause;
    console.log(query);
    return this.pool.query(query);
  }
}

export default Model;