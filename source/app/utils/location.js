const province = require("./tinh_tp.json");
const district = require("./quan_huyen.json");

let codeProvinces = ['79','48']
let codeDistrict = [] // null => all
let dataProvince = {};
for (const [key, value] of Object.entries(province)) {
  if(codeProvinces.includes(key)){
    dataProvince[key] =  value
  }
}

let dataDistrict = {};
for (const [key, value] of Object.entries(district)) {
  if(codeProvinces.includes(value.parent_code)){
    if(codeDistrict.length==0){
      dataDistrict[key] =  value
    }else{
      if(codeDistrict.includes(key)){
        dataDistrict[key] =  value
      }
    }
  }
}

module.exports = {
    dataProvince,
    dataDistrict,
};