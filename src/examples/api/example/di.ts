import { getDependency } from '@2ppl/core/di';
import { Service } from './service';

export const useExampleService = () => getDependency<Service>('EXAMPLE_SERVICE');
