import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
const signupRouter = express.Router();

export const SIGNUP_ROUTE = '/api/auth/signup';
signupRouter.post(
  SIGNUP_ROUTE,
  [
    body('email')
      .isEmail()
      .withMessage('Email must be in a valid format')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8, max: 32 })
      .withMessage('password must be between 8 to 32 characters')
      .escape(),
    body('password')
      .matches(/^(.*[a-z].*)$/)
      .withMessage('password must contain at least one lower-case character'),
    body('password')
      .matches(/^(.*[A-Z].*)$/)
      .withMessage('password must contain at least one upper-case character'),
    body('password')
      .matches(/^(.*\d.*)$/)
      .withMessage('password must contain at least one digit'),
  ],
  (req: Request, res: Response) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.sendStatus(422);
      //   res.sendStatus(422).send({ errors: errors.array() });
    }

    if (/.+@[A-Z]/g.test(req.body.email)) {
      res.sendStatus(422);
    }
    if (/[><'"/]/g.test(req.body.password)) {
      res.sendStatus(422);
    }
    res.send({ email: req.body.email });
  }
);

export default signupRouter;
