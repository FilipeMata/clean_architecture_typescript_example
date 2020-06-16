export interface SQL {
  findOne(options: any): Promise<any>;
  count(options: any): Promise<number>;
  findAll(options: any): Promise<any>;
  create(data: any, options?: any): Promise<any>;
  update(data: any, options?: any): Promise<any>;
  destroy(data: any, options?: any): Promise<any>;
};


export interface DB {
  [key: string]: SQL  
} 

export interface Connections {
  [key: string]: DB
}