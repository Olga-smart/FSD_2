import PaginationJs from '../../libs/paginationjs/init';

class Pagination {
  constructor(pagination, items, options) {
    Pagination.initPlugin(pagination, items, options);
  }

  static init(pagination, items, options) {
    return new Pagination(pagination, items, options);
  }

  static initPlugin(pagination, items, options = {}) {
    const pluginOptions = options;

    pluginOptions.itemsContainer = document.getElementById(pagination.dataset.itemsContainer);

    if (!options.itemsNumberPerPage) {
      pluginOptions.itemsNumberPerPage = 12;
    }

    PaginationJs.init(pagination, items, options);
  }
}

export default Pagination;
