import { OrderData } from '@useCases/common/dtos';

export interface DetailOrderResponseDTO {
  success?: OrderData,
  failures?: string[]
};

