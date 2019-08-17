import BaseModel from './models/BaseModel';

export default interface Serializer {
  fromJson(json: any): BaseModel;
  toJson(baseModel: BaseModel): any;
}
