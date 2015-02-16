var ajax_flag;

$(document).ready(function(){
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


$(document).ready(function(){
  $('#submit').click(function(){
    if ( ($('#text').val() == '') || ($('#number').val() == '') || ($('#date').val() == '') || ($('.select-category').val() == '') ){
      alert('入力が不足しています!');
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
      $('#category').load('https://gentle-sands-9095.herokuapp.com/new_format #category');
    }
   else {
    $('#category').load('https://gentle-sands-9095.herokuapp.com/new_format #button-parent');
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
