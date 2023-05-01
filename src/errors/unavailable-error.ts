import { ApplicationError } from '@/protocols';

export function unavailable(): ApplicationError {
  return {
    name: 'this element is not available',
    message: 'this element is not available',
  };
}
