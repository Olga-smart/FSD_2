import PaginationJs from '../../libs/paginationjs/PaginationJs';

class Pagination {
  constructor(pagination, items, options) {
    this.initPlugin(pagination, items, options);
  }

  initPlugin(pagination, items, options = {}) {
    const pluginOptions = options;

    pluginOptions.itemsContainer = document.getElementById(pagination.dataset.itemsContainer);

    if (!options.itemsNumberPerPage) {
      pluginOptions.itemsNumberPerPage = 12;
    }

    return new PaginationJs(pagination, items, options);
  }
}

export default Pagination;
