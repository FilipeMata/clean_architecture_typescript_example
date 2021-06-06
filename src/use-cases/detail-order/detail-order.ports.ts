import { DetailOrderResponseDTO } from './detail-order-response.dto';

export interface DetailOrderPresenter {
  show(result: DetailOrderResponseDTO): void | Promise<void>;
}