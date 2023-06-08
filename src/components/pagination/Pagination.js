import PaginationJs from '../../libs/paginationjs/PaginationJs';

class Pagination {
  constructor(pagination, items, options) {
    Pagination.initPlugin(pagination, items, options);
  }

  static initPlugin(pagination, items, options = {}) {
    const pluginOptions = options;

    pluginOptions.itemsContainer = document.getElementById(pagination.dataset.itemsContainer);

    if (!options.itemsNumberPerPage) {
      pluginOptions.itemsNumberPerPage = 12;
    }

    return new PaginationJs(pagination, items, options);
  }
}

export default Pagination;
