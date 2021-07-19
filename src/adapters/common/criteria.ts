type ExcludeKey<T, U> = 
  { [K in keyof T]: T[K] extends U ? never : K }[keyof T]


type ComparisonOps = '$equal' |
  '$notEqual' |
  '$greaterThan' |
  '$greaterThanEqual' |
  '$lessThan' |
  '$lessThanEqual';

type ValidationOps = '$is' | '$notIs';

type ListOp<Type> = {
  '$in'?: Type[],
  '$notIn'?: Type[],
}

type BetweenOp<Type> = {
  '$between'?: {
    firstValue: Type,
    secondValue: Type
  }
}

type LikeOp = {
  '$like'?: string
}

type ComparisonExpression<Type> = Partial<Record<ComparisonOps, Type>>;
type ValidationExpression = Partial<Record<ValidationOps, null | undefined | boolean>>;

type CommonExpression<Type> =
  ComparisonExpression<Type> |
  ListOp<Type> |
  BetweenOp<Type> |
  ValidationExpression;

type StringExpression = CommonExpression<string> | LikeOp;

type Expression<Type> = {
  [Property in keyof Type]?:
  Type[Property] extends number | Date ? CommonExpression<Type[Property]> :
  Type[Property] extends string ? StringExpression :
  Type[Property] extends boolean ? ValidationExpression :
  never
}

export type CriteriaExpression<Type> = Pick<Expression<Type>, ExcludeKey<Expression<Type>, never>>;

type CriteriaSentence<Type> = Criteria<Type> | CriteriaExpression<Type> | 'and' | 'or';

export class Criteria<Type> {
  private _sentence: CriteriaSentence<Type>[];

  constructor(expression: CriteriaExpression<Type>) {
    this._sentence = [expression];
  }

  public and(condition: Criteria<Type> | CriteriaExpression<Type>) {
    this._sentence.push('and');
    this._sentence.push(condition);

    return this;
  }

  public or(condition: Criteria<Type> | CriteriaExpression<Type>) {
    this._sentence.push('and');
    this._sentence.push(condition);

    return this;
  }

  public getSentence(): CriteriaSentence<Type>[] {
    return this._sentence;
  }
}
