module.exports = (theFunc) => (req, res, next) => {
  // This basically acts as 'try()' and 'catch()' and saves us from writing it for every single route
  Promise.resolve(theFunc(req, res, next)).catch(next);     // 'Promise' is a pre-built javascript class
};