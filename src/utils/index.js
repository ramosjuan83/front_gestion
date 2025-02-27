export * from "./moment";
export * from "./token";
export * from "./Swal";
export * from "./acl";
export * from "./calc";

export const tokenExpireAt = () => {
  //  expires 1 week from now
  return new Date(Date.now() + 60 * 60 * 24 * 7 * 1000);
};

export const serializer = {
  read: (v) => (v ? JSON.parse(v) : null),
  write: (v) => JSON.stringify(v),
};

export const defaultQuery = {
  skip: 0,
  limit: 30,
  sort: "id ASC",
  where: {},
  select: [],
};

export const mapHeaders = (col) => {
  return Object.assign(
    {},
    {
      visible: col.visible || true,
      nowrap: true,
      input_value: null,
      ...col,
    }
  );
};

export const onPaginate = (query, options) => {
  if (options && options.page) {
    query.sort = options.sortBy.length
      ? `${options.sortBy[0].key} ${options.sortBy[0].order}`
      : "id ASC";
    query.skip = query.limit * (options.page - 1);
  }
  return query;
};
