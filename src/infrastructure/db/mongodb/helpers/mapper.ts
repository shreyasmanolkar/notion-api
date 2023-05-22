import { ObjectId } from 'mongodb';

export const isValidObjectId = (id: string): boolean => ObjectId.isValid(id);

export const objectIdToString = (objectId: ObjectId): string => {
  return objectId.toHexString();
};

export const stringToObjectId = (string: string): ObjectId => {
  return new ObjectId(string);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapDocument = (document: any): any => {
  const { _id: objectId, ...rest } = document;
  const id = objectIdToString(objectId);
  return { ...rest, id };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapCollection = (collection: any[]): any[] => {
  return collection.map(document => mapDocument(document));
};
