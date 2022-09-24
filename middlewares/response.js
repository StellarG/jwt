'use strict';

const ress = {};

ress.successMessage = rs => (
    {
        code: '01',
        status: true,
        message: 'Success',
        data: rs
    }
);

ress.emptyMessage = (rs) => (
    {
        code: '02',
        status: true,
        message: rs
    }
);

ress.errorMessage = rs => (
    {
        code: '02',
        status: false,
        message: rs
    }
);

ress.forbiddenMessage = (M) => (
  {
    code: '02',
    status: false,
    message: M
  }
);

ress.emptyFile = M => (
  {
    code: '02',
    status: false,
    message: M
  }
);

ress.NotFound = (rs) => (
    {
        code : '02',
        status : false,
        message : rs
    }
)

module.exports = ress