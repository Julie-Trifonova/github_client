export type CollectionModel<K extends string | number, T> = {
  order: K[];
  entities: Record<K, T>;
};

export const getInitialCollectionModel = <T>(): CollectionModel<any, T> => ({
  order: [],
  entities: {},
});

export const normalizeCollection = <K extends string | number, T>(
  elements: T[],
  getKeyForElement: (element: T) => K
): CollectionModel<K, T> => {
  const collection: CollectionModel<K, T> = getInitialCollectionModel();
  elements.forEach((el) => {
    const id = getKeyForElement(el);
    collection.order.push(id);
    collection.entities[id] = el;
  });
  return collection;
};
