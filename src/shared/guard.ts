export default class Guard {

  public static againstNullOrUndefined(argument: any, argumentName: string) {
    if (argument === null || argument === undefined) {
      throw `${argumentName} is null or undefined`;
    }
  }

  public static isNotOneOf(argument: any, collection: any[], argumentName: string, collectionName: string) {
    if (collection.includes(argument)) {
      throw `${argumentName} is one of ${collectionName}`;
    }
  }
  

  public static isTrue(error: string | Error, condition: any) {
    if (!condition) {
      throw error;
    }
  }
}