import { Result } from '../shared/Result';

export default interface OutputPort<outputDTO> {
  show(result: outputDTO): void | Promise<void>;
}