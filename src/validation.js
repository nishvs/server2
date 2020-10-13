const { body, validationResult } = require('express-validator')

const intentValidationRules = () => {
  return [
    // botId must be an mongo id
    body('botId').isMongoId(),
    // message must be a string
    body('message').isString(),
    body('conversationId').isString(),
  ]
}

const createValidationRules = () => {
    return [
      // botId must be an mongo id
      body('botId').isMongoId(),
      // message must be a string
      body('message').isString(),
      body('conversationId').isString(),
      body('reply').isString(),
    ]
  }

const deleteValidationRules = () => {
return [
    body('conversationId').isString()
]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const inputErrors = []
  errors.array().map(err => inputErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({
    errors: inputErrors,
  })
}

module.exports = {
  createValidationRules,  
  deleteValidationRules,
  intentValidationRules,
  validate,
}
