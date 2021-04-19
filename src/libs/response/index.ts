export class Result<T> {
  isOk: boolean
  isError: boolean
  error: HttpError | null
  data?: T

  private constructor(isOk: boolean, error: HttpError | null, data?: T) {
    if (isOk && error) {
      throw new Error('Invalid Operation')
    }
    if (!isOk && !error) {
      throw new Error('Invalid Operation')
    }
    this.isOk = isOk
    this.isError = !isOk
    this.error = error
    this.data = data

    Object.freeze(this)
  }

  public static ok<U>(data?: U): Result<U> {
    return new Result<U>(true, null, data)
  }

  public static error<U>(error: HttpError): Result<U> {
    return new Result<U>(false, error)
  }
}

export class HttpError extends Error {
  constructor(public statusCode: number, public message: string) {
    super()
  }

  toJSON = JSON.stringify(this)
}

export class BadRequestError extends HttpError {
  constructor(public message: string) {
    super(402, message)
  }
}

export class UnauthorizedError extends HttpError {
  constructor(public message: string) {
    super(401, message)
  }
}

export class ForbiddenError extends HttpError {
  constructor(public message: string) {
    super(403, message)
  }
}

export class InternalServerError extends HttpError {
  constructor(public message: string) {
    super(500, message)
  }
}

export class HttpData<T> {
  constructor(public statusCode: number = 200, public data: T) {}
}
