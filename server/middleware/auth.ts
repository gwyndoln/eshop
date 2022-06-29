const auth = (req, res, next) => {
  console.log(1);
  next();
};

export default auth;
