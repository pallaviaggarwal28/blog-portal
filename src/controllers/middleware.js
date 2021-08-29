export const ensureUserLoggedIn = async(req, res, next) => {
  if(req.signedCookies.email) {
    next();
  } else {
    res.status(401);
    next(res.redirect('login', 401));
  }
}

export const validateSession = async(req, res, next) => {
  if(!req.signedCookies.email) {
    next();
  } else {
    next(res.redirect('/myBlogs'));
  }
}