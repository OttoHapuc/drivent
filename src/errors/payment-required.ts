import { ApplicationError } from '@/protocols';

export function paymentRequired(): ApplicationError {
  return {
    name: 'PaymentRequiredError',
    message: 'You have outstanding payments!',
  };
}
