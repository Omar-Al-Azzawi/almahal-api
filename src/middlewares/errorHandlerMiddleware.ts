import { NextFunction, Request, Response } from 'express'

type HttpException = {
    status: number
    message: string
}

const ErrorHandler = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500
    const message: string = error.message || 'Something went wrong'

    console.log(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`)
    res.status(status).json({ message })
  } catch (err) {
    next(err)
  }
}

export default ErrorHandler