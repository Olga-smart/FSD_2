/* eslint-disable no-param-reassign */
/* eslint-disable fsd/jq-use-js-prefix-in-selector */
// Because this is third party plugin
import 'paginationjs';

class PaginationJs {
  constructor(pagination, items, options) {
    this._pagination = pagination;
    this._items = items;
    this._itemsContainer = this.getItemsContainer();

    this.initPlugin(options);
  }

  initPlugin(options = {}) {
    const template = (data) => {
      let html = '';
      $.each(data, (index, item) => {
        html += item.outerHTML;
      });
      return html;
    };

    const items = this._items;
    const itemsContainer = this._itemsContainer;

    const pluginOptions = {
      dataSource: items,
      showNavigator: true,
      autoHidePrevious: true,
      autoHideNext: true,
      prevText: '',
      nextText: '',
      pageRange: 1,
      ulClassName: 'paginationjs-list',
      formatNavigator(currentPage, totalPage, totalNumber) {
        const firstNum = (currentPage - 1) * this.pageSize + 1;
        let lastNum = firstNum + this.pageSize - 1;

        if (lastNum > totalNumber) {
          lastNum = totalNumber;
        }

        if (totalNumber > 100) {
          totalNumber = '100+';
        }

        return `${firstNum} - ${lastNum} из ${totalNumber} вариантов аренды`;
      },
      callback(data) {
        const html = template(data);
        $(itemsContainer).html(html);

        if (options.callback) {
          options.callback();
        }
      },
    };

    if (options.itemsNumberPerPage) {
      pluginOptions.pageSize = options.itemsNumberPerPage;
    }

    if (options.formatItemFunction) {
      pluginOptions.formatResult = (data) => {
        const arr = [];
        $.each(data, (index, item) => {
          const card = options.formatItemFunction(item);
          arr.push(card);
        });
        return arr;
      };
    }

    $(this._pagination).pagination(pluginOptions);
  }

  getItemsContainer() {
    return document.getElementById(this._pagination.dataset.itemsContainer);
  }
}

export default PaginationJs;
