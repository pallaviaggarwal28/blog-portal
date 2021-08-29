import Model from '../models/model';
import bcrypt from 'bcryptjs';

const usersModel = new Model('users');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

export const getUserDetails = async(email) => {
  try {
    const clause = ` where email='${email}'`;
    return await usersModel.select('*', clause);
    } catch(err) {
      throw new Error(err.stack);
    }
};

export const registerUser = async(req, res) => {
  if(localStorage.getItem('email')) {
    res.cookie('email', localStorage.getItem('email'), {
      httpOnly: true,
      signed: true
      // secure: true // secure when in production
    });
    res.redirect('/myBlogs');
  }
  else {
    const {email, password} = req.body;
    const userData = await getUserDetails(email);
    if(userData.rows.length === 0) {
      const columns = 'email, password';
      const hashPassword = await bcrypt.hash(password, 12);
      const values = `'${email}', '${hashPassword}'`;
      try {
        await usersModel.insert(columns, values);
        res.cookie('email', email, {
          httpOnly: true,
          signed: true
          // secure: true // secure when in production
        });
        await setLocalStorage(email);
        res.redirect('/myBlogs');
      } catch(err) {
        res.status(200).json({messages: err.stack});
      }
    }
    else {
      res.status(200).json({messages: 'User already exists. Please login using this email'});
    }
  }
}

export const performLogin = async(req, res) => {
  if(localStorage.getItem('email')) {
    res.cookie('email', localStorage.getItem('email'), {
      httpOnly: true,
      signed: true
      // secure: true // secure when in production
    });
    res.redirect('/myBlogs');
  }
  else {
    const {email, password} = req.body;
    const userData = await getUserDetails(email);
    if(userData.rows.length === 1) {
      if(await bcrypt.compare(password, userData.rows[0].password)) {
        res.cookie('email', email, {
          httpOnly: true,
          signed: true
          // secure: true // secure when in production
        });
        await setLocalStorage(email);
        res.redirect('/myBlogs');
      } else {
        res.status(404).json({messages: 'Invalid password for '+email});
      }
    }
    else {
      res.status(404).json({messages: 'No user found with emailId '+email + ". Please Sign Up"});
    }
  }
}

export const setLocalStorage = async(email) => {
  localStorage.setItem('email', email);
}

export const logOut = async(req, res) => {
  localStorage.removeItem('email');
  res.clearCookie('email');
  res.redirect('/');
}
