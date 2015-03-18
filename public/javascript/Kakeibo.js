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

    if ( ($('#text').val() == '') || ($('#number').val() == '') || ($('#date').val() == '') || ($('.select-category').val() == '') ){
      alert('入力が不足しています!');

      if ( $('#text').val() != '' && title_flag == 1 ){
        $('#input-title').remove();
        title_flag = 0;
      }
      if ( $('#text').val() == '' && title_flag == 0 ){
        $('#fill-title').append('<div id="input-title">Input title！</div>');
        $('#input-title').css('color', '#d50000');
        title_flag = 1;
      }

      if ( $('#number').val() != '' && price_flag == 1 ){
        $('#input-price').remove();
        price_flag = 0;
      }
      if ( $('#number').val() == '' && price_flag == 0  ){
        $('#fill-price').append('<div id="input-price">Input price！</div>');
        $('#input-price').css('color', '#d50000');
        price_flag = 1;
      }

      if ( $('#date').val() != '' && date_flag == 1 ){
        $('#input-date').remove();
        date_flag = 0;
      }
      if ( $('#date').val() == '' && date_flag == 0){
        $('#fill-date').append('<div id="input-date">Input date！</div>');
        $('#input-date').css('color', '#d50000');
        date_flag = 1;
      }

      if ( $('.select-category').val() != '' && category_flag == 1 ){
        $('#input-category').remove();
        category_flag = 0;
      }
      if ( $('.select-category').val() == '' && category_flag == 0){
        $('#fill-category').append('<div id="input-category">Input category！</div>');
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

    if ( $('#select-date').val() == '' ){
      alert('日付を入力してくだい！');
      return false;
    }

  });

  $('#month-submit').click(function(){

    if ( $('#select-month').val() == '' ){
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
