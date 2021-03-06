/**
 * Created by https://trungquandev.com's author on 25/02/2018.
 */
const socket = io();

function nineScrollLeft() {
  $('.left').niceScroll({
    smoothscroll: true,
    horizrailenabled: false,
    cursorcolor: '#ECECEC',
    cursorwidth: '7px',
    scrollspeed: 50
  });
}
// function nineScrollRight(divId) {
//   $('.right .chat').niceScroll({
//     smoothscroll: true,
//     horizrailenabled: false,
//     cursorcolor: '#ECECEC',
//     cursorwidth: '7px',
//     scrollspeed: 50
//   });
//   $('.right .chat').scrollTop($('.right .chat')[0].scrollHeight);
// }
function nineScrollRight(divId) {
  $(`.right .chat[data-chat="${divId}"]`).niceScroll({
    smoothscroll: true,
    horizrailenabled: false,
    cursorcolor: '#ECECEC',
    cursorwidth: '7px',
    scrollspeed: 50
  });
  $(`.right .chat[data-chat="${divId}"]`).scrollTop($(`.right .chat[data-chat="${divId}"]`)[0].scrollHeight);
}

function enableEmojioneArea(divId) {
  $('.write-chat[data-chat="' + divId + '"]').emojioneArea({
    standalone: false,
    pickerPosition: 'top',
    filtersPosition: 'bottom',
    tones: false,
    autocomplete: false,
    inline: true,
    hidePickerOnBlur: true,
    search: false,
    shortnames: false,
    events: {
      keyup: function (editor, event) {
        $(`#write-chat-${divId}`).val(this.getText());
      },
      click: function () {
        textAndEmojiChat(divId);
        TypingOn(divId);
      },
      blur: function () {
        TypingOff(divId)
      }
    },
  });
  $('.icon-chat').bind('click', function (event) {
    event.preventDefault();
    $('.emojionearea-button').click();
    $('.emojionearea-editor').focus();
  });
}

function spinLoaded() {
  $('#loader').css('display', 'none');
}

function spinLoading() {
  $('#loader').css('display', 'block');
}

function ajaxLoading() {
  //   $(document)
  //     .ajaxStart(function () {
  //       spinLoading();
  //     })
  //     .ajaxStop(function () {
  //       spinLoaded();
  //     });
}

function showModalContacts() {
  $('#show-modal-contacts').click(function () {
    $(this).find('.noti_contact_counter').fadeOut('slow');
  });
}

function configNotification() {
  $('#noti_Button').click(function () {
    $('#notifications').fadeToggle('fast', 'linear');
    $('.noti_counter').fadeOut('slow');
    return false;
  });
  $(document).click(function () {
    $('#notifications').fadeOut('fast', 'linear');
  });
}

function gridPhotos(layoutNumber) {
  $(".show-images").unbind("click").on("click", function () {
    let href = $(this).attr("href");
    let imageModalId = href.substr(1);

    let originalDataImage = $(`#${imageModalId}`).find(".modal-body").html();


    let countRows = Math.ceil($(`#${imageModalId}`).find('div.all-images>img').length / layoutNumber);
    let layoutStr = new Array(countRows).fill(layoutNumber).join("");
    $(`#${imageModalId}`).find('div.all-images').photosetGrid({
      highresLinks: true,
      rel: 'withhearts-gallery',
      gutter: '2px',
      layout: layoutStr,
      onComplete: function () {
        $(`#${imageModalId}`).find('.all-images').css({
          'visibility': 'visible'
        });
        $(`#${imageModalId}`).find('.all-images a').colorbox({
          photo: true,
          scalePhotos: true,
          maxHeight: '90%',
          maxWidth: '90%'
        });
      }
    });
    //bat su kien dong modal
    $(`#${imageModalId}`).on("hide.bs.modal", function () {
      $(this).find(".modal-body").html(originalDataImage)
    });
  })

}

function showButtonGroupChat() {
  $('#select-type-chat').bind('change', function () {
    if ($(this).val() === 'group-chat') {
      $('.create-group-chat').show();
      // Do something...
    } else {
      $('.create-group-chat').hide();
    }
  });
}


function changeTypeChat() {
  $("#select-type-chat").on("change", function () {
    let optionSelected = $("option:selected", this);
    optionSelected.tab("show");
  })
}
function changeScreenChat() {
  $(".room-chat").on("click", function () {
    //thuc hien theo cac li c???a c??c conversation 
    let divId = $(this).data("id");
    $(".person").removeClass("active")
    $(`.person[data-chat=${divId}]`).addClass("active");
    //thuc hien theo man hinh pane 

    $(".rightside").find("div.tab-pane").removeClass("active");
    $(".rightside").find(`div.tab-pane[id="to_${divId}"]`).addClass("active");

    //c???u h??nh thanh cu???n xu???ng tin nh???n m???i .
    nineScrollRight(divId);
    //bat emoji 
    enableEmojioneArea(divId);
    imageChat(divId);
    attachmentChat(divId);
    videoChat(divId);
  })
}

function BufferToBase64(arrayBuffer) {
  return btoa(
    new Uint8Array(arrayBuffer)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
}
$(document).ready(function () {
  // Hide s??? th??ng b??o tr??n ?????u icon m??? modal contact
  showModalContacts();

  // B???t t???t popup notification
  configNotification();

  // C???u h??nh thanh cu???n
  nineScrollLeft();
  //nineScrollRight();

  // B???t emoji, tham s??? truy???n v??o l?? id c???a box nh???p n???i dung tin nh???n


  // Icon loading khi ch???y ajax
  //ajaxLoading();

  // Hi???n th??? button m??? modal t???o nh??m tr?? chuy???n
  showButtonGroupChat();

  // Hi???n th??? h??nh ???nh grid slide trong modal t???t c??? ???nh, tham s??? truy???n v??o l?? s??? ???nh ???????c hi???n th??? tr??n 1 h??ng.
  // Tham s??? ch??? ???????c ph??p trong kho???ng t??? 1 ?????n 5
  gridPhotos(5);

  // Th??m ng?????i d??ng v??o danh s??ch li???t k?? tr?????c khi t???o nh??m tr?? chuy???n
  //addFriendsToGroup();

  // Action h???y vi???c t???o nh??m tr?? chuy???n
  //cancelCreateGroup();
  //thay doi kieu tro chuyen 
  changeTypeChat();
  //thay doi m??n h??nh chat.
  changeScreenChat();
  //?????u tien ph???i c?? th???ng active 
  if ($("ul.people").find("a")[0].length) {
    $("ul.people").find("a")[0].click();
  }


  $("#video-chat-group").on("click", function () {
    alertify.notify("Kh??ng kh??? d???ng t??nh n??ng n??y v???i nh??m tr?? chuy???n.Vui l??ng th??? l???i v???i tr?? chu???en c?? nh??n", "error", 8);
  })
});
