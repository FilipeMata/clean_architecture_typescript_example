export default interface DetailOrderInputPort {
  execute(orderId: string): Promise<void>;
};
