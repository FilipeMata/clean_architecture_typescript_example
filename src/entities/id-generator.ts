import { UniqueEntityID } from "@entities";

export interface UniqueEntityIDGenerator {
  nextId(): UniqueEntityID
}