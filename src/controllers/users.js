import Model from '../models/model';

const usersModel = new Model('users');

export const getUser = async(req, res) => {
  try {
    const data = await usersModel.select('*', 'email='${req.body.email});
    if(data.length() > 0)
      res.status(400).json({messages: 'User already exists'});
  } catch(err) {
    res.status(200).json({messages: err.stack});
  }
};

export const insertUser = async(req, res) => {
  const {email, password} = req.body;
  const columns = 'email, password';
  const values = `'${email}', '${password}'`;
  try {
    const data = await usersModel.insert(columns, values);
    res.send("User registered successfully with id: " +data.rows[0].id);
  } catch(err) {
    res.status(200).json({messages: err.stack});
  }
}
