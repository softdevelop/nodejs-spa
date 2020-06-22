const config = require("../../config");

const CODE = {
    GET_OK: 200,
    CREATE_OK: 201,
    DELETE_OK: 204,
    NOT_MODIFIED: 304,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
}

const locations = {
  hai_chau: 'Quận Hải Châu',
  cam_le: 'Quận Cẩm Lệ',
  thanh_khe: 'Quận Thanh Khê',
  lien_chieu: 'Quận Liên Chiểu',
  ngu_hanh_son: 'Quận Ngũ Hành Sơn',
  son_tra: 'Quận Sơn Trà',
  khac: 'Khác'
}

const locationsArr = Object.keys(locations).map(item=>{
  return {
    name: locations[item],
    value: item
  }
})

const permissions = [
  'user.index',
  'user.edit',
  'user.view',
  'user.delete',
  'user.create',

  'spa.index',
  'spa.edit',
  'spa.view',
  'spa.delete',
  'spa.create',

  'service.index',
  'service.edit',
  'service.view',
  'service.delete',
  'service.create',

  'booking.index',
  'booking.edit',
  'booking.view',
  'booking.delete',
  'booking.create',

  'category.index',
  'category.edit',
  'category.view',
  'category.delete',
  'category.create',

  'news.index',
  'news.edit',
  'news.view',
  'news.delete',
  'news.create',

  'role.index',
  'role.edit',
  'role.view',
  'role.delete',
  'role.create',

  'staticpage.index',
  'staticpage.edit',
  'staticpage.view',
  'staticpage.delete',
  'staticpage.create',

  'qa.index',
  'qa.edit',
  'qa.view',
  'qa.delete',
  'qa.create',
  
  'experts.index',
  'experts.edit',
  'experts.view',
  'experts.delete',
  'experts.create',
  
]

module.exports = {
    CODE,
    locations,
    locationsArr,
    permissions
};