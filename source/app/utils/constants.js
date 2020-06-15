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

module.exports = {
    CODE,
    locations,
    locationsArr
};