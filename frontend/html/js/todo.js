$(function(){
  $.get("/api/todos").then(function(json){
    json.todos.forEach(element => {
      let checked = '';
      if(element.done_flg == 1){ checked = 'checked'; }

      $('#todos').append(
        '<tr class="todo">' +
        '  <td style="width:2rem">' +
        '    <input type="checkbox"name="done_flg" ' + checked + '/>' +
        '    <input type="hidden" name="id" value="' + element.id + '" />' +
        '  </td>' +
        '  <td style="width:22rem"><input type="text" style="border:none;width:22rem" name="title" value="' + element.title + '"/></td>' +
        '  <td><input type="date" style="border:none" name="time_limit" value="' + element.time_limit + '" /></td>' +
        '</tr>');
    });

    json.doneTodos.forEach(element => {
      let checked = '';
      if(element.done_flg == 1){ checked = 'checked'; }

      $('#donetodos').append(
        '<tr class="todo">' +
        '  <td style="width:2rem">' +
        '    <input type="checkbox"name="done_flg" ' + checked + '/>' +
        '    <input type="hidden" name="id" value="' + element.id + '" />' +
        '  </td>' +
        '  <td style="width:22rem"><input type="text" style="border:none;width:22rem; text-decoration:line-through" name="title" value="' + element.title + '"/></td>' +
        '  <td><input type="date" style="border:none" name="time_limit" value="' + element.time_limit + '" /></td>' +
        '</tr>');

    });

    //完了済みの個数取得・表示
    let doneCount = $('#donetodos').children("tr").length;
    $('#done_count').text(doneCount);

  }).done(function(){
    //更新処理
    $('.todo input').change(function(){
      const todo = $(this).parents('.todo');
      const id = todo.find('input[name="id"]');
      const title = todo.find('input[name="title"]');
      const timeLimit = todo.find('input[name="time_limit"]');
      const isDone = todo.find('input[name="done_flg"]').prop("checked");
      let doneFlg;
      if(isDone == true) {
        doneFlg = 1;
      }else{
        doneFlg = 0;
      }
    
      const params = {
        id : id.val(),
        title : title.val(),
        time_limit : timeLimit.val(),
        done_flg : doneFlg
      }
      $.ajax({
        url: "/api/todos/" + params.id,
        type: 'PUT',
        data: JSON.stringify(params),
        contentType: 'application/json',
        error: function(result) {
          console.error(result);
        }
      });
    
      //完了ボタンを押した際の処理
      let doneCount =  $('#done_count').text();
    
      if($(this).prop('name') == "done_flg"){
        if(isDone){
          $(todo).appendTo('#donetodos');
          todo.find('input[name="title"]').css('text-decoration','line-through');
          todo.find('input[name="time_limit"]').css('text-decoration','line-through');
          doneCount ++;
        } else {
          $(todo).appendTo('#todos');
          todo.find('input[name="title"]').css('text-decoration','none');
          todo.find('input[name="time_limit"]').css('text-decoration','none');
          doneCount --;
        }
    
        $("#done_count").text(doneCount);
      }
    })
  })

  
  //完了済みタスク表示/非表示切り替え
  $('.button_for_show').click(function(){
      let showState = $('#done_table_container').css('display');
      if(showState == "none") {
          $('#done_table_container').show();
          $(this).css({ transform: ' rotate(45deg)','bottom':'-4px' });
      } else {
          $('#done_table_container').hide();
          $(this).css({ transform: ' rotate(225deg)','bottom':'4px' });
      }
  })
  
  //追加処理
  $('#add').click(function() {
      // inputをjson形式に変換
      const form = document.getElementById("add_form");
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      $.ajax({
          url: "/api/todos",
          type: 'POST',
          data: JSON.stringify(data),
          contentType: 'application/json',
          success: function(result) {
              const tr = $('#todos tr:first');
              if (tr.length == 0) {
                window.location.reload();
              }
              const clone = $('#todos tr:first').clone(true);
              clone.find('input[name="id"]').val(data.id);
              clone.find('input[name="title"]').val(data.title);
              clone.find('input[name="time_limit"]').val(data.time_limit);
              $('#todos').append(clone);
          }
      })
  })
  
  //削除処理
  $('#delete').click(function(){
      $.ajax({
        url: "/api/todos/done",
        type: 'DELETE',
        success: function(result) {
          $('#donetodos').empty();
          $('#done_count').text(0);
        }
      });
  })

})