interface ValueObjectProps {
  [index: string]: any;
}

/**
 * @desc ValueObjects are objects that represents a simple entity whose
 * equality is not based on idenity but determined through their structrual property.
 */

export abstract class ValueObject<T extends ValueObjectProps> {
  public props: T;

  constructor(props: T) {
    let baseProps: any = {
      ...props,
    }

    this.props = baseProps;
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (!vo || !vo.props) {
      return false;
    }
   
    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }
}