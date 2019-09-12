
$(function() {

  var search_list = $("#user-search-result");
  

function appendUsers(user) {
  var html = `<div class="chat-group-user clearfix">
               <p class="chat-group-user__name">${user.name}</p>
               <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
             </div>`;
              search_list.append(html);
}

function appendErrMsgToHTML(msg){
  var html = 
              `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
              </div>`;
              search_list.append(html);
}

  $(".chat-group-user__input").on("keyup", function() {
    var input = $(".chat-group-user__input").val();
    console.log(input)
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUsers(user);
        })
      }
      else{
        $("#user-search-result").empty();
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました')
    })
  });
});