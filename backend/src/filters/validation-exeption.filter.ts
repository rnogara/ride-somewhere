import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception.getResponse) {
      const responseBody = exception.getResponse();
      if (responseBody.message && Array.isArray(responseBody.message)) {
        const errors = responseBody.message.map((error) => {
          const [errorCode, errorDescription] = error.split(': ');
          return { error_code: errorCode, error_description: errorDescription };
        });

        return response.status(HttpStatus.BAD_REQUEST).json(errors[0]);
      }
    }
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error_code: 'INTERNAL_ERROR',
      error_description: 'Ocorreu um erro inesperado.',
    });
  }
}
