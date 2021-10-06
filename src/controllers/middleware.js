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
  console.log(error)
  next(error)
}

export const errorResponder = async(error, req, res, next) => {
  if (res.headersSent) {
    return next(error)
  } else if (error.type === 'user-already-exists') {
    logError(200, res, error)
  } else if (error.type === 'time-out') {
    logError(408, res, error)
  } else if (error.type === 'unauthorized') {
    logError(401, res, error)
  } else if (err.type === 'invalid password') {
    logError(403, res, error)
  } else if (err.type === 'not found') {
    logError(404, res, error)
  } else {
    logError(500, res, error)
  }
}

const logError = (statusCode, res, error) => {
  res.status(statusCode)
  res.json({
    message: error.message,
    stack: error.stack
  })
}