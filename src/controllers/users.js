import Model from '../models/model';
import bcrypt from 'bcryptjs';

const usersModel = new Model('users');

export const getUser = async(req, res) => {
  try {
    const {email, password} = req.body;
    const clause = ` where email='${email}'`;
    const data = await usersModel.select('*', clause);
    if(data.length() > 0)
      res.status(400).json({messages: 'User already exists. Please login using this email'});
    } catch(err) {
      res.status(200).json({messages: err.stack});
    }
};

export const registerUser = async(req, res) => {
  await getUser(req, res);
  const {email, password} = req.body;
  const columns = 'email, password';
  let hashPassword='';
  await bcrypt.hash(password, 12).then((hash) => {
    hashPassword=hash;
  })
  const values = `'${email}', '${hashPassword}'`;
  try {
    await usersModel.insert(columns, values);
    res.redirect('/login');
  } catch(err) {
    res.status(200).json({messages: err.stack});
  }
}
