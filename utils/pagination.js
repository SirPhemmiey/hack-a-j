/**
 *
 * @description paginate a search
 * @param {number} page - page number
 * @param {number} limit - limit of page items
 * @returns object
 */
function paginate(page, limit) {
  /**
   * Convert to an integer
   */
  let _page = parseInt(page, 10);
  if (isNaN(_page) || _page < 1) {
    _page = 1;
  }
  /**
   * Convert to an integer
   */
  let _limit = parseInt(limit, 10);

  /**
   * Be sure to cater for all possible cases
   */
  if (isNaN(_limit)) {
    _limit = 10;
  } else if (_limit > 50) {
    _limit = 50;
  } else if (_limit < 1) {
    _limit = 1;
  }
  const offset = (_page - 1) * _limit;

  return {
    offset,
    _limit,
    page: _page
  };
}

module.exports = paginate;
