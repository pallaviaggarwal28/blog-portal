export const ensureUserLoggedIn = async(req, res, next) => {
  console.log(req.signedCookies);
  if(req.signedCookies.email) {
    next();
  } else {
    res.status(401);
    next(res.redirect('login', 401));
  }
}