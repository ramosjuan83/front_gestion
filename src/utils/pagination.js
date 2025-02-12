/**
 *
 * @param {Object} pagination
 * @param {Object} options
 * @returns returns the pagination object with the new pagination
 */
export const setupPagination = (pagination, options) => {
  console.log(options);
  if (!options) return pagination;
  if (!options.sortBy) return pagination;
  if (!options.sortBy.length === 0) return pagination;

  if (options.sortBy.length > 0) {
    const { key, order } = options.sortBy[0];
    pagination.sort = `${key} ${order}`;
  }

  pagination.limit = options.itemsPerPage;
  pagination.skip = (options.page - 1) * options.itemsPerPage;

  return pagination;
};

/**
 *
 * @param {Object} filters
 * @param {Object} options
 * @returns returns the filters object with the new filters
 */
export const setupFilters = (filters, headers) => {
  if (!filters) return {};
  let criteria = {};

  for (const key in filters) {
    const def = headers.find((h) => (h?.campo || h.key) === key);
    if (!def) continue;
    if (filters[key] === "") continue;
    if (filters[key] === null) continue;
    if (def) {
      if (def.type === "string") {
        criteria[key] = { contains: filters[key] };
      }
      if (def.type === "number" || def.type === "date") {
        criteria[key] = filters[key];
      }
    }
  }

  return criteria;
};
