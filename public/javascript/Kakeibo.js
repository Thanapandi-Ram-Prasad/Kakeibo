var ajax_flag;
var title_flag = 0;
var price_flag = 0;
var date_flag = 0;
var category_flag = 0;


$(function(){
  $('.delete').click(function(){
    if ( confirm('are you sure?') ){
    }
    else{
      return false;
    }
  });
});


if ( $('#category-list').children().length == 0 ){
  $('#category-list').css('display', 'none');
  $('#button').after('<div id="first-msg">Input your category!</div>');
}
else if ( $('#category-list').children().length != 0 ){
  ajax_flag = 1;
}


$(function(){
  $(document).on('click', '#submit', function(){

    if ( ($('#text').val() == '') || ($('#number').val() == '') || ($('#date').val().length != 10) || ($('.select-category').val() == '') ){
      alert('入力が不足しています!');

      if ( $('#text').val() != '' && title_flag == 1 ){
        $('#input-title').remove();
        title_flag = 0;
      }
      if ( $('#text').val() == '' && title_flag == 0 ){
        $('#fill-title').append('<div id="input-title">Check title！</div>');
        $('#input-title').css('color', '#d50000');
        title_flag = 1;
      }

      if ( $('#number').val() != '' && price_flag == 1 ){
        $('#input-price').remove();
        price_flag = 0;
      }
      if ( $('#number').val() == '' && price_flag == 0  ){
        $('#fill-price').append('<div id="input-price">Check price！</div>');
        $('#input-price').css('color', '#d50000');
        price_flag = 1;
      }

      if ( $('#date').val().length == 10 && date_flag == 1 ){
        console.log($('#date').val().length);
        $('#input-date').remove();
        date_flag = 0;
      }
      if ( $('#date').val().length != 10 && date_flag == 0){
        $('#fill-date').append('<div id="input-date">Check date！</div>');
        $('#input-date').css('color', '#d50000');
        date_flag = 1;
      }

      if ( $('.select-category').val() != '' && category_flag == 1 ){
        $('#input-category').remove();
        category_flag = 0;
      }
      if ( $('.select-category').val() == '' && category_flag == 0){
        $('#fill-category').append('<div id="input-category">Check category！</div>');
        $('#input-category').css('color', '#d50000');
        category_flag = 1;
      }

      return false;
    }

  });
});


$(function(){
  $(document).on('click', '#button', function(){
    $('#category-list').remove();
    $('#button-parent').remove();
    $('#category').append('<div id="category-text"><input type="text" name="category" class="select-category"></div>');
    $('#category').append('<div id="return-parent"><button type="button" id="return">Return</button></div>');
  });
  $(document).on('click', '#return', function(){
    $('#category-text').remove();
    $('#return-parent').remove();

    if ( ajax_flag == 1 ){
      $('#category').load('https://gentle-sands-9095.herokuapp.com/new_format #category', function(){
        $('#input-category').remove();
        category_flag = 0;
      });
    }
   else {
    $('#category').load('https://gentle-sands-9095.herokuapp.com/new_format #button-parent', function(){
      $('#input-category').remove();
      category_flag = 0;
    });
   }

  });
});


$(function(){
  $('#date-submit').click(function(){

    if ( $('#select-date').val().length != 10 ){
      alert('日付を入力してくだい！');
      return false;
    }

  });

  $('#month-submit').click(function(){

    if ( $('#select-month').val().length != 7 ){
      alert('月を入力してください！');
      return false;
    }

  });
});


if ( $('#list-parent').next().length == 0 ){
  $('#date-list-table').css('display', 'none');
  $('#date-cotegory-table').css('display', 'none');
  $('#date-msg').after('<div>まだ入力がありません！</div>');
}

if ( $('#month-left-box').children().length == 0 ){
  $('.month-table').css('display', 'none');
  $('#month-msg').after('<div>まだ入力がありません！</div>');
}

if ( $('#right-box').children().length == 2 ){
  $('#left-box').css('display', 'none');
  $('#right-box').css('display', 'none');
  $('#year-msg').after('<div>まだ入力がありません！</div>');
}


$(function(){
  $(document).on('click', '#sign-submit', function(){

    if ( $('#sign-name').val().length <  5 || $('#sign-password').val().length <  8 ){

      if ( $('#sign-name').val().length < 5  ){
        $('#remaining-name').html(5 - $('#sign-name').val().length + '文字不足!');
      }
      else {
        $('#remaining-name').html('');
      }

      if ( $('#sign-password').val().length < 8  ){
        $('#remaining-password').html(8 - $('#sign-password').val().length + '文字不足!');
      }
      else {
        $('#remaining-password').html('');
      }

      return false;
    }
  });
});


$(function(){

  $.ajax({
  type: 'GET',
  url: 'https://gentle-sands-9095.herokuapp.com/json/' + $('#year-msg').text(),
  dataType: 'json',
  success: function(data){
    if( data.jan_datas.length != 0) {
      $('#jan-check').css('display', 'inline');
    }
    if( data.feb_datas.length != 0) {
      $('#feb-check').css('display', 'inline');
    }
    if( data.mar_datas.length != 0) {
      $('#mar-check').css('display', 'inline');
    }
    if( data.apr_datas.length != 0) {
      $('#apr-check').css('display', 'inline');
    }
    if( data.may_datas.length != 0) {
      $('#may-check').css('display', 'inline');
    }
    if( data.jun_datas.length != 0) {
      $('#jun-check').css('display', 'inline');
    }
    if( data.jul_datas.length != 0) {
      $('#jul-check').css('display', 'inline');
    }
    if( data.aug_datas.length != 0) {
      $('#aug-check').css('display', 'inline');
    }
    if( data.sep_datas.length != 0) {
      $('#sep-check').css('display', 'inline');
    }
    if( data.oct_datas.length != 0) {
      $('#oct-check').css('display', 'inline');
    }
    if( data.nov_datas.length != 0) {
      $('#nov-check').css('display', 'inline');
    }
    if( data.dec_datas.length != 0) {
      $('#dec-check').css('display', 'inline');
    }
  },
  error: function() {
    console.log('miss');
  }
});
});


$(function(){
  var dateFormat = 'yy-mm-dd';
  $('#select-date').datepicker({
    numberOfMonths: 1,
    showButtonPanel: true,
    changeYear: true,
    changeMonth: true,
    dateFormat: dateFormat,
    showAnim: "drop"
});
});


$(function(){
  var dateFormat = 'yy-mm';
  $('#select-month').datepicker({
    numberOfMonths: 1,
    showButtonPanel: true,
    changeYear: true,
    changeMonth: true,
    dateFormat: dateFormat,
    showAnim: "drop"
});
});


$(function(){
  var dateFormat = 'yy-mm-dd';
  $('#date').datepicker({
    numberOfMonths: 1,
    showButtonPanel: true,
    changeYear: true,
    changeMonth: true,
    dateFormat: dateFormat,
    showAnim: "drop"
});
});
