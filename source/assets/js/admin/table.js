// $(document).ready(function(){
//   var listChecked = [];
//   $('table.DataTable').on('click', '.CheckAll input', function () {
//     if($(this).prop('checked')) {
//       listChecked = [];
//       $('.CheckRecord input').each(function() {
//         listChecked.push($(this).attr('alt'));
//         $(this).prop('checked', true);
//       });
//       $('.CheckAll input').prop('checked', true);
//     } else {
//       $('.CheckRecord input').each(function() {
//         listChecked = [];
//         $(this).prop('checked', false);
//       });
//       $('.CheckAll input').prop('checked', false);
//     }
//   });

//   //Check to delete
//   $('table.DataTable').on('click', '.CheckRecord input', function () {
//     var idCheckBox = $(this).attr('alt');
//     if($(this).prop('checked')) {
//       listChecked.push(idCheckBox);
//     } else {
//       listChecked.splice($.inArray(idCheckBox, listChecked), 1);
//       $('.CheckAll input').prop('checked', false);
//     }
//   });

//   //Click To Delete Record
//   $('.BtnDelete').on('click', function () {
//     if(listChecked.length > 0) {
//       var isDel = confirm("Are you sure delete those records!");
//       if(isDel){
//         let ctl = $(this).attr('ctl')
//         urlDel = "/admin/"+ctl+"/delmany";
//         $.ajax({
//           url: urlDel,
//           dataType: "json",
//           data: {
//             ids: listChecked
//           },
//           type: "POST",
//           success: function (data) {
//             console.log('succ', data);
//             if(data.success) {
//               $.each(listChecked, function (k, v) {
//                 $('#Row-'+v).remove();
//               });
//               listChecked = [];
//             }
//           },
//           error: function(err){
//             console.log('err', err);
//           }
//         })
//       }
//     } else {
//       alert("Nobody to delete!");
//     }
//   });
// })


$(document).ready(function () {
  var listChecked = [];
  $("table.DataTable").on("click", ".CheckAll input", function () {
    if ($(this).prop("checked")) {
      listChecked = [];
      $(".CheckRecord input").each(function () {
        listChecked.push($(this).attr("alt"));
        $(this).prop("checked", true);
      });
      $(".CheckAll input").prop("checked", true);
    } else {
      $(".CheckRecord input").each(function () {
        listChecked = [];
        $(this).prop("checked", false);
      });
      $(".CheckAll input").prop("checked", false);
    }
  });

  //Check to delete
  $("table.DataTable").on("click", ".CheckRecord input", function () {
    var idCheckBox = $(this).attr("alt");
    if ($(this).prop("checked")) {
      listChecked.push(idCheckBox);
    } else {
      listChecked.splice($.inArray(idCheckBox, listChecked), 1);
      $(".CheckAll input").prop("checked", false);
    }
  });

  //Click To Delete Record
  $(".BtnDelete").on("click", function () {
    if (listChecked.length > 0) {
      var isDel = confirm("Are you sure delete those records!");
      if (isDel) {
        let ctl = $(this).attr("ctl");
        urlDel = "/admin/" + ctl + "/delmany";
        $.ajax({
          url: urlDel,
          dataType: "json",
          data: {
            ids: listChecked,
          },
          type: "POST",
          success: function (data) {
            console.log("succ", data);
            if (data.success) {
              $.each(listChecked, function (k, v) {
                $("#Row-" + v).remove();
              });
              listChecked = [];
            }
          },
          error: function (err) {
            console.log("err", err);
          },
        });
      }
    } else {
      alert("Nobody to delete!");
    }
  });

  $(".BtnChangeLimit").on("change", function () {
    let limit = $(this).val();
    let url = new URL(location.href);
    url.searchParams.set("limit", limit);
    url.searchParams.set("page", 1);
    var newUrl = url.href;
    location.href = newUrl;
  });
  
  $('.BtnSearch').on('click', function(){
    let search = $('.InputSearch').val();
    let url = new URL(location.href);
    url.searchParams.set("search", search);
    url.searchParams.set("page", 1);
    var newUrl = url.href;
    location.href = newUrl;
  })
});
$(".BtnDeleteMany").on("click", function () {
  if (listChecked.length > 0) {
    let ctl = $(this).attr("ctl");
    let isDel = confirm("Are you sure delete those records!");
    if (isDel) {
      urlDel = "/admin/" + ctl + "/service"+"/delManyService"
      $.ajax({
        url: urlDel,
        dataType: "json",
        data: {
          ids: listChecked,
        },
        type: "POST",
        success: function (data) {
          console.log("succ", data);
          if (data.success) {
            $.each(listChecked, function (k, v) {
              $("#Row-" + v).remove();
            });
            listChecked = [];
          }
        },
        error: function (err) {
          console.log("err", err);
        },
      });
    }
  } else {
    alert("Nobody to delete!");
  }
});