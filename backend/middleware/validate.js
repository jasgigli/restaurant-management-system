const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });
  if (!result.success) {
    const errors = result.error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }
  // Attach validated data back to req
  req.body = result.data.body;
  req.query = result.data.query;
  req.params = result.data.params;
  next();
};

export default validate;
