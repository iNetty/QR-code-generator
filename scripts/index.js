var currentIndex = 1;
var workNumReg = /^T\d+$/;
var linkAddressReg = /^(http(s?)):\/\/(?:[\w\-_]+\.)+[A-za-z]{2,4}(?:[\/\?#][\/=\?%\-&~`@\[\]\':+!\.#\w]*)?/;

$(document).ready(function() {
  // tab点击
  $('.container .tab-item').on('click', function() {
    console.log($(this).data('index'));
    var index = $(this).data('index');
    if (currentIndex === index) {
      return false;
    }
    $('.container .content-item')
      .hide()
      .removeClass('active');
    $('.container .tab-item').removeClass('active');
    $('.container .content-item[data-index=' + index + ']')
      .fadeIn()
      .addClass('active');
    $('.container .tab-item[data-index=' + index + ']').addClass('active');
    currentIndex = index;
  });

  // 监听input的输入事件
  $('.container .input-area #work-num').on('change', function() {

	var workNum = $('.container .input-area #work-num').val();
    //if (!workNumReg.test(workNum)) {
    if (workNum == null) {
		$('.container .input-area .work-num-tips')
			.show()
			.html('文本内容为空');
		  return false;
	}
    else if (workNum!=null && workNum.length > 200) {
      $('.container .input-area .work-num-tips')
        .show()
        .html('文本长度超过200');
      return false;
    } else {
      $('.container .input-area .work-num-tips').hide();
    }
	
  });
  $('.container #work-num-to-qrcode').on('click', function() {
    var workNum = $('.container .input-area #work-num').val();
    //if (!workNumReg.test(workNum)) {
    if (workNum == null) {
		$('.container .input-area .work-num-tips')
			.show()
			.html('文本内容为空');
		  return false;
	}
    else if (workNum!=null && workNum.length > 200) {
      $('.container .input-area .work-num-tips')
        .show()
        .html('文本长度超过200');
      return false;
    } else {
      $('.container .input-area .work-num-tips').hide();
    }
    // 开始生成二维码
    $('.container #qrcode').empty();
    var link = workNum;
    var qrcode = new QRCode(document.getElementById('qrcode'), {
      text: link,
      width: 230,
      height: 230,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.L
    });
    $('.container .preview .default').hide();
    $('.container #preview-link')
      .show()
      .val(link);
    $('.container .preview-label').show();
  });

  $('.container .input-area #link-address').on('change', function() {
    if (!linkAddressReg.test($(this).val())) {
      $('.container .input-area .link-address-tips')
        .show()
        .html('请输入正确的网址');
    } else {
      $('.container .input-area .link-address-tips').hide();
    }
  });
  $('.container #link-address-to-qrcode').on('click', function() {
    var linkAddress = $('.container .input-area #link-address').val();
    if (!linkAddressReg.test(linkAddress)) {
      $('.container .input-area .link-address-tips')
        .show()
        .html('请输入正确的网址');
      return false;
    } else {
      $('.container .input-area .link-address-tips').hide();
    }
    // 开始生成二维码
    $('.container #qrcode').empty();
    var qrcode = new QRCode(document.getElementById('qrcode'), {
      text: linkAddress,
      width: 230,
      height: 230,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.L
    });
    $('.container .preview .default').hide();
  });
});
