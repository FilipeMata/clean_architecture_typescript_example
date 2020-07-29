'use strict';

class DefaultPresenter {
  getOutput(req, res, response) {
    return res.status(200)
      .json(response);
  }
}

module.exports = DefaultPresenter;