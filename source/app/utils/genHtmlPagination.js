
// // total: 101,
// // limit: 10,
// // offset: 0,
// // page: 1,
// // pages: 11
// function genHtmlPagination(total, limit, page, pages){
//   let html = '';
//   if(pages <= 5){
//     [...Array(pages).keys()].forEach(item=>{
//       html += `<li class="paginate_button page-item  ${page==item+1?'active':''}"><a href="?page=${item+1}&limit=${limit}" class="page-link">${item+1}</a></li>`
//     })
//   }else{
//     if([1,2,3,4,5].includes(page)){
//       [1,2,3,4,5].forEach(item=>{
//         if(item==0) return;
//         else html += `<li class="paginate_button page-item ${page==item?'active':''}"><a href="?page=${item}&limit=${limit}" class="page-link">${item}</a></li>`
//       })
//       html += `<li class="paginate_button page-item disabled" id="user_ellipsis"><a href="#" class="page-link">…</a></li>`
//       html += `<li class="paginate_button page-item "><a href="?page=${pages}&limit=${limit}" class="page-link">${pages}</a></li>`
//       html += `<li class="paginate_button page-item next" id="user_next"><a href="?page=${page+1}&limit=${limit}" class="page-link">Next</a></li>`
//     }else if([pages,pages-1,pages-2,pages-3].includes(page)){
//       html += `<li class="paginate_button page-item previous"><a href="?page=${page-1}&limit=${limit}" class="page-link">Previous</a></li>`
//       html += `<li class="paginate_button page-item "><a href="?page=1&limit=${limit}" class="page-link">1</a></li>`
//       html += `<li class="paginate_button page-item "><a href="?page=2&limit=${limit}" class="page-link">2</a></li>`
//       html += `<li class="paginate_button page-item "><a href="?page=3&limit=${limit}" class="page-link">3</a></li>`
//       html += `<li class="paginate_button page-item disabled" id="user_ellipsis"><a href="#" class="page-link">…</a></li>`
//       let arr = [pages-3,pages-2,pages-1,pages]
//       arr.forEach(item=>{
//         if(item==0) return;
//         else html += `<li class="paginate_button page-item ${page==item?'active':''}"><a href="?page=${item}&limit=${limit}" class="page-link">${item}</a></li>`
//       })
//     }else{
//       html += `<li class="paginate_button page-item previous"><a href="?page=${page-1}&limit=${limit}" class="page-link">Previous</a></li>`
//       html += `<li class="paginate_button page-item "><a href="?page=1&limit=${limit}" class="page-link">1</a></li>`
//       html += `<li class="paginate_button page-item disabled" id="user_ellipsis"><a href="#" class="page-link">…</a></li>`
//       html += `<li class="paginate_button page-item "><a href="?page=${page-2}&limit=${limit}" class="page-link">${page-2}</a></li>`
//       html += `<li class="paginate_button page-item "><a href="?page=${page-1}&limit=${limit}" class="page-link">${page-1}</a></li>`
//       html += `<li class="paginate_button page-item active"><a href="?page=${page}&limit=${limit}" class="page-link">${page}</a></li>`
//       html += `<li class="paginate_button page-item "><a href="?page=${page+1}&limit=${limit}" class="page-link">${page+1}</a></li>`
//       html += `<li class="paginate_button page-item disabled" id="user_ellipsis"><a href="#" class="page-link">…</a></li>`
//       html += `<li class="paginate_button page-item "><a href="?page=${pages}&limit=${limit}" class="page-link">${pages}</a></li>`
//       html += `<li class="paginate_button page-item next" id="user_next"><a href="?page=${page+1}&limit=${limit}" class="page-link">Next</a></li>`
//     }
//   }
//   return `
//   <div class="dataTables_paginate paging_simple_numbers">
//     <ul class="pagination" style="float:right;">
//       ${html}
//     </ul>
//   </div>
//   `
// }

// module.exports = genHtmlPagination



// total: 101,
// limit: 10,
// offset: 0,
// page: 1,
// pages: 11
function genHtmlPagination(total, limit, page, pages, search, float){
  let html = '';
  if(pages <= 5){
    [...Array(pages).keys()].forEach(item=>{
      html += `<li class="paginate_button page-item  ${page==item+1?'active':''}"><a href="?page=${item+1}&limit=${limit}&search=${search}" class="page-link">${item+1}</a></li>`
    })
  }else{
    if([1,2,3,4,5].includes(page)){
      [1,2,3,4,5].forEach(item=>{
        if(item==0) return;
        else html += `<li class="paginate_button page-item ${page==item?'active':''}"><a href="?page=${item}&limit=${limit}&search=${search}" class="page-link">${item}</a></li>`
      })
      html += `<li class="paginate_button page-item disabled" id="user_ellipsis"><a href="#" class="page-link">…</a></li>`
      html += `<li class="paginate_button page-item "><a href="?page=${pages}&limit=${limit}&search=${search}" class="page-link">${pages}</a></li>`
      html += `<li class="paginate_button page-item next" id="user_next"><a href="?page=${page+1}&limit=${limit}&search=${search}" class="page-link">Next</a></li>`
    }else if([pages,pages-1,pages-2,pages-3].includes(page)){
      html += `<li class="paginate_button page-item previous"><a href="?page=${page-1}&limit=${limit}&search=${search}" class="page-link">Previous</a></li>`
      html += `<li class="paginate_button page-item "><a href="?page=1&limit=${limit}&search=${search}" class="page-link">1</a></li>`
      html += `<li class="paginate_button page-item "><a href="?page=2&limit=${limit}&search=${search}" class="page-link">2</a></li>`
      html += `<li class="paginate_button page-item "><a href="?page=3&limit=${limit}&search=${search}" class="page-link">3</a></li>`
      html += `<li class="paginate_button page-item disabled" id="user_ellipsis"><a href="#" class="page-link">…</a></li>`
      let arr = [pages-3,pages-2,pages-1,pages]
      arr.forEach(item=>{
        if(item==0) return;
        else html += `<li class="paginate_button page-item ${page==item?'active':''}"><a href="?page=${item}&limit=${limit}&search=${search}" class="page-link">${item}</a></li>`
      })
    }else{
      html += `<li class="paginate_button page-item previous"><a href="?page=${page-1}&limit=${limit}&search=${search}" class="page-link">Previous</a></li>`
      html += `<li class="paginate_button page-item "><a href="?page=1&limit=${limit}&search=${search}" class="page-link">1</a></li>`
      html += `<li class="paginate_button page-item disabled" id="user_ellipsis"><a href="#" class="page-link">…</a></li>`
      html += `<li class="paginate_button page-item "><a href="?page=${page-2}&limit=${limit}&search=${search}" class="page-link">${page-2}</a></li>`
      html += `<li class="paginate_button page-item "><a href="?page=${page-1}&limit=${limit}&search=${search}" class="page-link">${page-1}</a></li>`
      html += `<li class="paginate_button page-item active"><a href="?page=${page}&limit=${limit}&search=${search}" class="page-link">${page}</a></li>`
      html += `<li class="paginate_button page-item "><a href="?page=${page+1}&limit=${limit}&search=${search}" class="page-link">${page+1}</a></li>`
      html += `<li class="paginate_button page-item disabled" id="user_ellipsis"><a href="#" class="page-link">…</a></li>`
      html += `<li class="paginate_button page-item "><a href="?page=${pages}&limit=${limit}&search=${search}" class="page-link">${pages}</a></li>`
      html += `<li class="paginate_button page-item next" id="user_next"><a href="?page=${page+1}&limit=${limit}&search=${search}" class="page-link">Next</a></li>`
    }
  }
  return `
  <div class="dataTables_paginate paging_simple_numbers">
    <ul class="pagination" style="float:${float?float:'right'};">
      ${html}
    </ul>
  </div>
  `
}

function genHtmlPaginationClient(total, limit, page, pages, search, float){
  let html = '';
  if(pages <= 5){
    [...Array(pages).keys()].forEach(item=>{
      html += `<li class="paginate_button page-item  ${page==item+1?'active':''}"><a href="/index/trang-${item+1}" class="page-link">${item+1}</a></li>`
    })
  }else{
    if([1,2,3,4,5].includes(page)){
      [1,2,3,4,5].forEach(item=>{
        if(item==0) return;
        else html += `<li class="paginate_button page-item ${page==item?'active':''}"><a href="/index/trang-${item}" class="page-link">${item}</a></li>`
      })
      html += `<li class="paginate_button page-item disabled" id="user_ellipsis"><a href="#" class="page-link">…</a></li>`
      html += `<li class="paginate_button page-item "><a href="/index/trang-${pages}" class="page-link">${pages}</a></li>`
      html += `<li class="paginate_button page-item next" id="user_next"><a href="/index/trang-${page+1}" class="page-link"><i class="fa fa-angle-right"></i></a></li>`
    }else if([pages,pages-1,pages-2,pages-3].includes(page)){
      html += `<li class="paginate_button page-item previous"><a href="/index/trang-${page-1}" class="page-link"><i class="fa fa-angle-left"></i></a></li>`
      html += `<li class="paginate_button page-item "><a href="/index/trang-1" class="page-link">1</a></li>`
      html += `<li class="paginate_button page-item "><a href="/index/trang-2" class="page-link">2</a></li>`
      html += `<li class="paginate_button page-item "><a href="/index/trang-3" class="page-link">3</a></li>`
      html += `<li class="paginate_button page-item disabled" id="user_ellipsis"><a href="#" class="page-link">…</a></li>`
      let arr = [pages-3,pages-2,pages-1,pages]
      arr.forEach(item=>{
        if(item==0) return;
        else html += `<li class="paginate_button page-item ${page==item?'active':''}"><a href="/index/trang-${item}" class="page-link">${item}</a></li>`
      })
    }else{
      html += `<li class="paginate_button page-item previous"><a href="/index/trang-${page-1}" class="page-link"><i class="fa fa-angle-left"></i></a></li>`
      html += `<li class="paginate_button page-item "><a href="/index/trang-1" class="page-link">1</a></li>`
      html += `<li class="paginate_button page-item disabled" id="user_ellipsis"><a href="#" class="page-link">…</a></li>`
      html += `<li class="paginate_button page-item "><a href="/index/trang-${page-2}" class="page-link">${page-2}</a></li>`
      html += `<li class="paginate_button page-item "><a href="/index/trang-${page-1}" class="page-link">${page-1}</a></li>`
      html += `<li class="paginate_button page-item active"><a href="/index/trang-${page}" class="page-link">${page}</a></li>`
      html += `<li class="paginate_button page-item "><a href="/index/trang-${page+1}" class="page-link">${page+1}</a></li>`
      html += `<li class="paginate_button page-item disabled" id="user_ellipsis"><a href="#" class="page-link">…</a></li>`
      html += `<li class="paginate_button page-item "><a href="/index/trang-${pages}" class="page-link">${pages}</a></li>`
      html += `<li class="paginate_button page-item next" id="user_next"><a href="/index/trang-${page+1}" class="page-link"><i class="fa fa-angle-right"></i></a></li>`
    }
  }
  return `
  <div class="dataTables_paginate paging_simple_numbers">
    <ul class="pagination" style="float:${float?float:'right'};">
      ${html}
    </ul>
  </div>
  `
}

module.exports = {
  genHtmlPagination,
  genHtmlPaginationClient
}