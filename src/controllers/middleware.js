export const ensureUserLoggedIn = async(req, res, next) => {
  if(!req.signedCookies.email) {
    res.redirect('/login');
  } else {
    return next();
  }
}

export const validateSession = async(req, res, next) => {
  if(req.signedCookies.email) {
    res.redirect('/myBlogs');
  } else {
    return next();
  }
}