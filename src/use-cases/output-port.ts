export interface OutputPort<outputDTO> {
  show(result: outputDTO): void | Promise<void>;
}