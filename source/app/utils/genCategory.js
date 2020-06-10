function genCategoryTree (categories){
  let result = '';
  categories.forEach(category => {
    if(category.children && category.children.length>0){
      let children = genCategoryTree(category.children);
      result += `
      <li class="dd-item" data-id="${category._id}">
        <div class="delete" data-id="${category._id}">x</div>
        <a class="edit" href="/admin/categories/${category.slug}/edit"><i class="icon-pencil"></i></a>
        <div class="dd-handle">${category.name}
        </div>
        <ol class="dd-list">
          ${children}
        </ol>
      </li>
      `
    }else{
      result += `
        <li class="dd-item" data-id="${category._id}">
          <div class="delete" data-id="${category._id}">x</div>
          <a class="edit" href="/admin/categories/${category.slug}/edit"><i class="icon-pencil"></i></a>
          <div class="dd-handle">${category.name}
          </div>
        </li>
      `
    }
  })
  return result;
}

function genOptions (categories, currentCategoryName = '', idSelected = '', listChildId = []){
  // idSelected is a field that to check parentId of category, to show in edit page
  // listChildId is a file that to check that these options are child of current category, so when edit, a category can't set as child of its' child
  let result = '';
  categories.forEach(category => {
    if(category.children && category.children.length>0){
      let children = genOptions(category.children, `${currentCategoryName} - ${category.name}`, idSelected, listChildId);
      let isSelected = idSelected == ''+category._id ? 'selected' : '';
      if(!listChildId.includes(''+category._id))
      result += `
        <option ${isSelected} value="${category._id}">${currentCategoryName} - ${category.name}</option>
        ${children}
      `
    }else{
      let isSelected = idSelected == ''+category._id ? 'selected' : '';
      if(!listChildId.includes(''+category._id))
      result += `
      <option ${isSelected} value="${category._id}">${currentCategoryName} - ${category.name}</option>
      `
    }
  })
  return result;
}

module.exports = {
  genCategoryTree,
  genOptions
}