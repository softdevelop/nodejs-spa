$(document).ready(function() {
  $(function() {

      $('.summernote').summernote({
          height: 350, // set editor height
          minHeight: null, // set minimum height of editor
          maxHeight: null, // set maximum height of editor
          focus: false, // set focus to editable area after initializing summernote,

         toolbar: [
           // [groupName, [list of button]]
           ['style', ['style']],
           ['style', ['bold', 'italic', 'underline', 'clear']],
           ['font', ['strikethrough', 'superscript', 'subscript']],
           ['fontname', ['fontname']],
           ['fontfamily', ['arial', 'couriernew', 'helvetice', 'poppins']],
           ['fontsize', ['fontsize']],
           ['color', ['color']],
           ['para', ['ul', 'ol', 'paragraph']],
           ['height', ['height']],
           ['insert', [
             'link', 
             // 'picture', 
             // 'video'
           ]],
           ['view', ['fullscreen', 'codeview', 'help']]
         ],
         styleTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'normal'],
      });

      $('.inline-editor').summernote({
          airMode: true
      });

  });
});