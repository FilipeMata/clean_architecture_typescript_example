interface GenerateOrderFailures {
  nonExistentProductId: boolean;
};

export default interface GenerateOrderResponseDTO {
  success?: void,
  failures?: GenerateOrderFailures
};
