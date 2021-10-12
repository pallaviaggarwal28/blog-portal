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

export const errorLogger = async(error, req, res, next) => {
  console.log(error.message)
  console.log(error.status)
  console.log(error.statusCode)
  console.log(error.stack)
  next(error)
}

export const errorResponder = async(error, req, res, next) => {
  req.flash("error", error.message);
  res.locals.messages = req.flash('error');
  // const page = req.url.split('/')[2];
  // console.log(page);
  res.render(`login`, {msg: req.flash('error')});
  //res.redirect('back');
}