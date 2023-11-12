document.getElementById('map_div_car').style.display = 'none';
document.getElementById('map_div_ped').style.display = 'none';

var date1 = document.getElementsByClassName('date1');
var travel_array = [];
var travel_array2 = [];
var travel_array3 = [];
var travel_array4 = [];
var travel_array5 = [];
var travel_array6 = [];
var travel_array7 = [];
var travel_memo_array = [];
var itemList_copy;
var itemList_copy2;
var itemList_copy3;
var itemList_copy4;
var itemList_copy5;
var itemList_copy6;
var itemList_copy7;

 
// 마이페이지 오프캔버스
// 이벤트 리스너 추가
$(document).ready(function() {
$('#myOffcanvas').on('shown.bs.offcanvas', function () {
// 다른 오프캔버스가 나타날 때 실행할 작업을 여기에 작성합니다.
console.log('Offcanvas is shown.');
});

$('#Favorites').click(function() {
$('#Offcanvas_Favorites').offcanvas('show');
});

$('#History').click(function() {
	console.log("History 버튼 클릭!");
	// 이 부분에서 "/getHistory" 엔드 포인트로 GET 요청을 보내도록 설정
	$.ajax({
		type : 'GET',
		url : '/getHistory',
		dataType: 'json',
		success:function(data) {
			console.log(data + ' 데이터');
			
			// 'data' 값을 사용하여 텍스트를 추가
			//$('#Offcanvas_History .offcanvas-body ul').html('<li>' + data + '</li>');
			
			// 'data' 값을 사용하여 텍스트를 엘리먼트에 추가
			var ulElement = $('#Offcanvas_History .offcanvas-body ul');
			ulElement.empty(); // 기존 내용 삭제

            // 'data'의 결과를 반복하여 목록으로 표시
            data.forEach(function (result) {
                var liElement = '<li class="nav-item">';
                liElement += '<button class="nav-link active HistorySChe" type="button" aria-current="page" id="History" value="' + result.schedule_UUID + '">' + result.travel_TITLE + '</button>';
                liElement += '<button type="button" id="History_cancel"><i class="bi bi-x"></i></button>';
                liElement += '</li>';
                ulElement.append(liElement);
            });

            $('#Offcanvas_History').offcanvas('show');
        },
        error: function () {
            //요청이 실패하면 실행되는 코드
            console.error('요청 실패');
        }
    });
    console.log("History 클릭 js 함수 완료");
});

// 이벤트 위임을 사용하여 동적으로 생성된 버튼에 대한 클릭 이벤트 처리
$(document).on('click', '.HistorySChe', function() {
    var buttonValue = $(this).val(); // 클릭한 버튼의 value를 가져옴
    console.log('버튼 클릭: ' + buttonValue);

    // 클릭한 버튼의 텍스트를 사용하여 GET 요청을 보냅니다.
    $.ajax({
        type: 'GET',
        url: '/historySche',  // 서버의 엔드포인트 URL
        data: { buttonValue: buttonValue }, // 필요한 데이터를 전달할 수 있습니다.
        success: function(data) {
            // 서버에서 받은 응답에 대한 처리를 여기에 추가
            console.log('서버 응답: ' + data);
            // 예를 들어, 스케줄을 화면에 표시하거나 다른 작업을 수행할 수 있습니다.
        },
        error: function() {
            // 요청이 실패하면 실행되는 코드
            console.error('GET 요청 실패');
        }
    });
});

$('#Journal').click(function() {
$('#Offcanvas_Journal').offcanvas('show');
});

});


// 메모장 날짜 선택

$.datepicker.setDefaults({
  dateFormat: 'yy-mm-dd',
  prevText: '이전 달',
  nextText: '다음 달',
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
  showMonthAfterYear: true,
  yearSuffix: '년'
});

$(function () {
  $('.datepicker').datepicker();
});


// 일정 날짜 범위 선택
$(document).ready(function(){       
       $( "#datepicker_start,#datepicker_end" ).datepicker({
            changeMonth: true,
            changeYear: true,
            showMonthAfterYear: true,
            dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'],
            dateFormat:'yy-mm-dd',
        });
       
       $('#datepicker_start').datepicker("option", "maxDate", $("#datepicker_end").val());
       $('#datepicker_start').datepicker("option", "onClose", function (selectedDate){
           $("#datepicker_end").datepicker( "option", "minDate", selectedDate );
           });
       
       $('#datepicker_end').datepicker();
       $('#datepicker_end').datepicker("option", "minDate", $("#datepicker_start").val());
       $('#datepicker_end').datepicker("option", "onClose", function (selectedDate){
           $("#datepicker_start").datepicker( "option", "maxDate", selectedDate );
          });
  	   
       
});


// 계획표 스크립트
$(document).on('click', ".title",function () {
	  $("[class*=table-box]").sortable({
	    // 드래그 앤 드롭 단위 css 선택자
	    connectWith: ".column",
	    // 움직이는 css 선택자
	    handle: ".title",
	    // 움직이지 못하는 css 선택자
	    cancel: ".no-move",
	    // 이동하려는 location에 추가 되는 클래스
	    placeholder: "card-placeholder",
        stop: function(event, ui) { 
        	saveSortableOrder();
        },
        update: function(event, ui) {
        	saveSortableOrder();
          },
          start: function (event, ui) {
              // 드래그 시작 시 포커스 유지
              ui.item.focus();

            		// 일정표를 클릭하면 메모장 날짜 텍스트 출력
            		$('#datepicker').val($("#date1").text());
            		
            		// 일정표와 메모장의 연결을 위함, 메모장의 제목 텍스트의 아이디 값에 클릭한 일정의 아이디 값 연결함.
            		document.querySelector('#memo_text_id').setAttribute("value",ui.item.find('.title').attr('id'));
            		
            		
            		// DB에 정상적으로 삽입되었다면, DB에 location_UUID와 location_ID를 확인된다면
					// 출력!
            		$.ajax({
            		    url: "/location_print",
            		    type: "post",
            		    dataType: "json", // 이 부분을 수정하지 마십시오
            		    traditional: true,
            		    data: {
            		        "location_UUID": $('#location_uuid').val(),
            		        "location_ID": ui.item.find('.title').attr('id')
            		    },success: function (data2) {
            		        // 여기서 data2를 사용하여 원하는 작업을 수행
            		        // data2 객체 내의 배열에서 첫 번째 요소 추출
            		        var firstItem = data2.data2[0];


            		        // 필요한 데이터 추출
            		        var location_TITLE = firstItem.location_TITLE; // 메모명
            		        var location_TIME = firstItem.location_TIME;
            		        var location_NAME = firstItem.location_NAME; // 장소명
            		        var location_LAT = firstItem.location_LAT;
            		        var location_LNG = firstItem.location_LNG;
            		        var location_MEMO = firstItem.location_MEMO;
            		        var location_REVIEW = firstItem.location_REVIEW;

            		        // HTML 요소에 데이터 출력
            		        $('#memo_text').val(location_TITLE);
            		        $('#memo_time').val(location_TIME);
            		        $('#memo_place').val(location_NAME);
            		        $('#memo_place_lat').val(location_LAT);
            		        $('#memo_place_lng').val(location_LNG);
            		        $('#memo_content').val(location_MEMO);
            		        $('#review_content').val(location_REVIEW);
            		        // 다른 필드에 대한 데이터도 출력하십시오.
            		    },
            		    error: function (xhr, status, error) {
            		        console.error("GET 요청 오류: " + error);
            		    }
            		});

            }
	  });
	  // 해당 클래스 하위의 텍스트 드래그를 막는다.
	  $(".column .card").disableSelection();
	});

// 일정표를 이동하면 배열에 저장됨
function saveSortableOrder() {
	  const items = $(".table-box1 [id^=title]");
	  const items2 = $(".table-box2 [id^=title]");
	  const items3 = $(".table-box3 [id^=title]");
	  const items4 = $(".table-box4 [id^=title]");
	  const items5 = $(".table-box5 [id^=title]");
	  const items6 = $(".table-box5 [id^=title]");
	  const items7 = $(".table-box5 [id^=title]");
	  const itemList = [];
	  const itemList2 = [];
	  const itemList3 = [];
	  const itemList4 = [];
	  const itemList5 = [];
	  const itemList6 = [];
	  const itemList7 = [];
	  
	  // 일정의 아이디와 텍스트를 배열 저장
	  // 일정의 아이디는 메모장 배열과 연관이 있기때문이다.
	  items.each(function() {
		itemList.push($(this).attr('id'));
	    itemList.push($(this).text());
	  });
	  
	  // 둘째 날의 일정들의 배열에 순서대로 삽입
	  items2.each(function() {
			itemList2.push($(this).attr('id'));
		    itemList2.push($(this).text());
		  });

	  // 셋째 날의 일정들의 배열에 순서대로 삽입
	  items3.each(function() {
			itemList3.push($(this).attr('id'));
		    itemList3.push($(this).text());
		  });
	  
	  // 넷째 날의 일정들의 배열에 순서대로 삽입
	  items4.each(function() {
			itemList4.push($(this).attr('id'));
		    itemList4.push($(this).text());
		  });
	  
	  // 다섯째 날의 일정들의 배열에 순서대로 삽입
	  items5.each(function() {
			itemList5.push($(this).attr('id'));
		    itemList5.push($(this).text());
		  });
	  
	  // 여섯째 날의 일정들의 배열에 순서대로 삽입
	  items6.each(function() {
			itemList6.push($(this).attr('id'));
		    itemList6.push($(this).text());
		  });
	  
	  // 다섯째 날의 일정들의 배열에 순서대로 삽입
	  items7.each(function() {
			itemList7.push($(this).attr('id'));
		    itemList7.push($(this).text());
		  });
}


// '날짜 범위 출력' 버튼 클릭 이벤트
$('#btnShowDates').on('click', function() {
    var startDate = $('#datepicker_start').datepicker('getDate');
    var endDate = $('#datepicker_end').datepicker('getDate');
    
 // 최대 7일 뒤의 날짜를 계산
    var maxDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);

    if (startDate && endDate && startDate <= endDate && endDate <= maxDate) {
        var currentDate = new Date(startDate);
        var dateRangeOutput = "";
        var a = parseInt(1);
        var travel_table = "";

        while (currentDate <= endDate) {
            var formattedDate = $.datepicker.formatDate('yy-mm-dd', currentDate);
            dateRangeOutput += "<div class='date' id='date"+a+"' style='width:150px;'>"+ formattedDate + "</div>" ;
            currentDate.setDate(currentDate.getDate() + 1);  
            var box_title
            
            
            travel_table += 
            	`<div class="column table-box`+a+`" name="table-box`+a+`">
            <div class="card text-white card_package`+a+`" id="box_title_`+a+`_1" style="background-color: #96B6C5">
              <div class="card-title`+a+`" tabindex="0">
                <div class="title" id="title`+a+`_1" style="font-size: 12px; align-items: center;">Header</div>
                <div class="deleteBox">x</div>
              </div>
            </div>
            
            <label class="createBox`+a+`">[추가]</label>
          </div>`
  
          if(a == 1){
          travel_array[0] = formattedDate; // 배열의 맨 처음은 날짜
          travel_array.push("title"+a); // 배열의 두번째는 일정표 카드의 내용(제목) 담기
          
          travel_array2[0] = formattedDate; // 배열의 맨 처음은 날짜
          travel_array2.push("title"+a); // 배열의 두번째는 일정표 카드의 내용(제목) 담기
          
          travel_array3[0] = formattedDate; // 배열의 맨 처음은 날짜
          travel_array3.push("title"+a); // 배열의 두번째는 일정표 카드의 내용(제목) 담기
          
          travel_array4[0] = formattedDate; // 배열의 맨 처음은 날짜
          travel_array4.push("title"+a); // 배열의 두번째는 일정표 카드의 내용(제목) 담기
          
          travel_array5[0] = formattedDate; // 배열의 맨 처음은 날짜
          travel_array5.push("title"+a); // 배열의 두번째는 일정표 카드의 내용(제목) 담기
          
          travel_array6[0] = formattedDate; // 배열의 맨 처음은 날짜
          travel_array6.push("title"+a); // 배열의 두번째는 일정표 카드의 내용(제목) 담기
          
          travel_array7[0] = formattedDate; // 배열의 맨 처음은 날짜
          travel_array7.push("title"+a); // 배열의 두번째는 일정표 카드의 내용(제목) 담기
          }
            a += 1;	
        }
        
        $("#dateRangeOutput").html(dateRangeOutput);
        $("#travel_table").html(travel_table);
        
          saveSortableOrder(); // 일정표를 추가하면 배열에 저장됨

    } else {
        $("#dateRangeOutput").html("올바른 날짜 범위를 선택해주세요.");
        $("#travel_table").html("");
    }
});


// 삭제 라벨
$(document).on('click', ".deleteBox", function () {
  $(this).parent().parent().remove();
/*
 * saveSortableOrder(); // 일정표를 삭제하면 배열에 저장됨
 */});

var box_title_index = 2;
var box_title_index2 = 2;
var box_title_index3 = 2;
var box_title_index4 = 2;
var box_title_index5 = 2;
var box_title_index6 = 2;
var box_title_index7 = 2;

// 추가 라벨1
$(document).on('click', ".createBox1", function () {

innerHtml = ""

innerHtml += `<div class="card text-white bg-info card_package" id="box_title_1_`+box_title_index+`">
	   <div class="card-title">
		<div class="title" id="title1_`+box_title_index+`" tabindex="-1">dmddo</div>
		<div class="deleteBox">x</div>
	</div>
     </div>
     `	
		
$(".table-box1").append(innerHtml);

box_title_index += 1;

saveSortableOrder();
});

// 추가 라벨2
$(document).on('click', ".createBox2", function () {
innerHtml = ""
innerHtml += `<div class="card text-white bg-info card_package" id="box_title_2_`+box_title_index2+`">
<div class="card-title">
<div class="title" id="title2_`+box_title_index2+`" tabindex="-1">dmddo</div>
<div class="deleteBox">x</div>
</div>
</div>
`	
$(".table-box2").append(innerHtml);

box_title_index2 += 1;

saveSortableOrder();
});

// 추가 라벨3
$(document).on('click', ".createBox3", function () {
innerHtml = ""
innerHtml += `<div class="card text-white bg-info card_package" id="box_title_3_`+box_title_index3+`">
<div class="card-title">
<div class="title" id="title3_`+box_title_index3+`" tabindex="-1">dmddo</div>
<div class="deleteBox">x</div>
</div>
</div>
`	
$(".table-box3").append(innerHtml);

box_title_index3 += 1;

saveSortableOrder();
});


// 추가 라벨4
$(document).on('click', ".createBox4", function () {
innerHtml = ""
innerHtml += `<div class="card text-white bg-info card_package" id="box_title_4_`+box_title_index4+`">
<div class="card-title">
<div class="title" id="title4_`+box_title_index4+`" tabindex="-1">dmddo</div>
<div class="deleteBox">x</div>
</div>
</div>
`	
$(".table-box4").append(innerHtml);

box_title_index4 += 1;

saveSortableOrder();
});


// 추가 라벨5
$(document).on('click', ".createBox5", function () {
innerHtml = ""
innerHtml += `<div class="card text-white bg-info card_package" id="box_title_5_`+box_title_index5+`">
<div class="card-title">
<div class="title" id="title5_`+box_title_index5+`" tabindex="-1">dmddo</div>
<div class="deleteBox">x</div>
</div>
</div>
`	
$(".table-box5").append(innerHtml);

box_title_index5 += 1;

saveSortableOrder();
});


// 추가 라벨6
$(document).on('click', ".createBox6", function () {
innerHtml = ""
innerHtml += `<div class="card text-white bg-info card_package" id="box_title_6_`+box_title_index6+`">
<div class="card-title">
<div class="title" id="title6_`+box_title_index6+`" tabindex="-1">dmddo</div>
<div class="deleteBox">x</div>
</div>
</div>
`	
$(".table-box6").append(innerHtml);

box_title_index6 += 1;

saveSortableOrder();
});



// 추가 라벨7
$(document).on('click', ".createBox7", function () {
innerHtml = ""
innerHtml += `<div class="card text-white bg-info card_package" id="box_title_7_`+box_title_index7+`">
<div class="card-title">
<div class="title" id="title7_`+box_title_index7+`" tabindex="-1">dmddo</div>
<div class="deleteBox">x</div>
</div>
</div>
`	
$(".table-box7").append(innerHtml);

box_title_index7 += 1;

saveSortableOrder();
});



// 첫째 날 일정 클릭
$(document).ready(function() {
$(document).on('click', ".table-box1 [id^=title]", function () { 

	$(".card-title1").focus();
	
	// 일정표를 클릭하면 메모장 날짜 텍스트 출력
	$('#datepicker').val($("#date1").text());
	
	// 일정표와 메모장의 연결을 위함, 메모장의 제목 텍스트의 아이디 값에 클릭한 일정의 아이디 값 연결함.
	document.querySelector('#memo_text_id').setAttribute("value",$(this).attr('id'));
	
	
	// DB에 정상적으로 삽입되었다면, DB에 location_UUID와 location_ID를 확인된다면 출력!
	$.ajax({
	    url: "/location_print",
	    type: "post",
	    dataType: "json", // 이 부분을 수정하지 마십시오
	    traditional: true,
	    data: {
	        "location_UUID": $('#location_uuid').val(),
	        "location_ID": $(this).attr('id')
	    },success: function (data2) {
	        // 여기서 data2를 사용하여 원하는 작업을 수행
	        // data2 객체 내의 배열에서 첫 번째 요소 추출
	        var firstItem = data2.data2[0];

	        // 필요한 데이터 추출
	        var location_TITLE = firstItem.location_TITLE; // 메모명
	        var location_TIME = firstItem.location_TIME;
	        var location_NAME = firstItem.location_NAME; // 장소명
	        var location_LAT = firstItem.location_LAT;
	        var location_LNG = firstItem.location_LNG;
	        var location_MEMO = firstItem.location_MEMO;
	        var location_REVIEW = firstItem.location_REVIEW;
	        
	        // HTML 요소에 데이터 출력
	        $('#memo_text').val(location_TITLE);
	        $('#memo_time').val(location_TIME);
	        $('#memo_place').val(location_NAME);
	        $('#memo_place_lat').val(location_LAT);
	        $('#memo_place_lng').val(location_LNG);
	        $('#memo_content').val(location_MEMO);
	        $('#review_content').val(location_REVIEW);

	    },
	    error: function (xhr, status, error) {
	        console.error("GET 요청 오류: " + error);
	    }
	});

});
});

// 둘째 날 일정 클릭
$(document).on('click', ".table-box2 [id^=title]", function () { 

	$(".card-title2").focus();
	
	// 일정표를 클릭하면 메모장 날짜 텍스트 출력
	$('#datepicker').val($("#date2").text());
	
	$(".memo_padding").show(); // 메모장 보이게 하기
	$(".map_div_container").height('1530px');
	$(".advertisement").css("margin-top", "680px");
	
	// 일정표와 메모장의 연결을 위함, 메모장의 제목 텍스트의 아이디 값에 클릭한 일정의 아이디 값 연결함.
	document.querySelector('#memo_text_id').setAttribute("value",$(this).attr('id'));

	// DB에 정상적으로 삽입되었다면, DB에 location_UUID와 location_ID를 확인된다면 출력!
	$.ajax({
	    url: "/location_print",
	    type: "post",
	    dataType: "json", // 이 부분을 수정하지 마십시오
	    traditional: true,
	    data: {
	        "location_UUID": $('#location_uuid').val(),
	        "location_ID": $(this).attr('id')
	    },success: function (data2) {
	        
	        // data2 객체 내의 배열에서 첫 번째 요소 추출
	        var firstItem = data2.data2[0];

	        // 필요한 데이터 추출
	        var location_TITLE = firstItem.location_TITLE; // 메모명
	        var location_TIME = firstItem.location_TIME;
	        var location_NAME = firstItem.location_NAME; // 장소명
	        var location_LAT = firstItem.location_LAT;
	        var location_LNG = firstItem.location_LNG;
	        var location_MEMO = firstItem.location_MEMO;
	        var location_REVIEW = firstItem.location_REVIEW;

	        // HTML 요소에 데이터 출력
	        $('#memo_text').val(location_TITLE);
	        $('#memo_time').val(location_TIME);
	        $('#memo_place').val(location_NAME);
	        $('#memo_place_lat').val(location_LAT);
	        $('#memo_place_lng').val(location_LNG);
	        $('#memo_content').val(location_MEMO);
	        $('#review_content').val(location_REVIEW);
	        // 다른 필드에 대한 데이터도 출력하십시오.
	    },
	    error: function (xhr, status, error) {
	        console.error("GET 요청 오류: " + error);
	    }
	});
});



// 셋째 날 일정 클릭
$(document).on('click', ".table-box3 [id^=title]", function () { 

	$(".card-title3").focus();
	
	// 일정표를 클릭하면 메모장 날짜 텍스트 출력
	$('#datepicker').val($("#date3").text());
	
	$(".memo_padding").show(); // 메모장 보이게 하기
	$(".map_div_container").height('1530px');
	$(".advertisement").css("margin-top", "680px");
	
	// 일정표와 메모장의 연결을 위함, 메모장의 제목 텍스트의 아이디 값에 클릭한 일정의 아이디 값 연결함.
	document.querySelector('#memo_text_id').setAttribute("value",$(this).attr('id'));

	// DB에 정상적으로 삽입되었다면, DB에 location_UUID와 location_ID를 확인된다면 출력!
	$.ajax({
	    url: "/location_print",
	    type: "post",
	    dataType: "json", // 이 부분을 수정하지 마십시오
	    traditional: true,
	    data: {
	        "location_UUID": $('#location_uuid').val(),
	        "location_ID": $(this).attr('id')
	    },success: function (data2) {
	        
	        // data2 객체 내의 배열에서 첫 번째 요소 추출
	        var firstItem = data2.data2[0];

	        // 필요한 데이터 추출
	        var location_TITLE = firstItem.location_TITLE; // 메모명
	        var location_TIME = firstItem.location_TIME;
	        var location_NAME = firstItem.location_NAME; // 장소명
	        var location_LAT = firstItem.location_LAT;
	        var location_LNG = firstItem.location_LNG;
	        var location_MEMO = firstItem.location_MEMO;
	        var location_REVIEW = firstItem.location_REVIEW;

	        // HTML 요소에 데이터 출력
	        $('#memo_text').val(location_TITLE);
	        $('#memo_time').val(location_TIME);
	        $('#memo_place').val(location_NAME);
	        $('#memo_place_lat').val(location_LAT);
	        $('#memo_place_lng').val(location_LNG);
	        $('#memo_content').val(location_MEMO);
	        $('#review_content').val(location_REVIEW);
	        // 다른 필드에 대한 데이터도 출력하십시오.
	    },
	    error: function (xhr, status, error) {
	        console.error("GET 요청 오류: " + error);
	    }
	});
});


// 넷째 날 일정 클릭
$(document).on('click', ".table-box4 [id^=title]", function () { 

	$(".card-title4").focus();
	
	// 일정표를 클릭하면 메모장 날짜 텍스트 출력
	$('#datepicker').val($("#date4").text());
	
	$(".memo_padding").show(); // 메모장 보이게 하기
	$(".map_div_container").height('1530px');
	$(".advertisement").css("margin-top", "680px");
	
	// 일정표와 메모장의 연결을 위함, 메모장의 제목 텍스트의 아이디 값에 클릭한 일정의 아이디 값 연결함.
	document.querySelector('#memo_text_id').setAttribute("value",$(this).attr('id'));

	// DB에 정상적으로 삽입되었다면, DB에 location_UUID와 location_ID를 확인된다면 출력!
	$.ajax({
	    url: "/location_print",
	    type: "post",
	    dataType: "json", // 이 부분을 수정하지 마십시오
	    traditional: true,
	    data: {
	        "location_UUID": $('#location_uuid').val(),
	        "location_ID": $(this).attr('id')
	    },success: function (data2) {
	        
	        // data2 객체 내의 배열에서 첫 번째 요소 추출
	        var firstItem = data2.data2[0];

	        // 필요한 데이터 추출
	        var location_TITLE = firstItem.location_TITLE; // 메모명
	        var location_TIME = firstItem.location_TIME;
	        var location_NAME = firstItem.location_NAME; // 장소명
	        var location_LAT = firstItem.location_LAT;
	        var location_LNG = firstItem.location_LNG;
	        var location_MEMO = firstItem.location_MEMO;
	        var location_REVIEW = firstItem.location_REVIEW;

	        // HTML 요소에 데이터 출력
	        $('#memo_text').val(location_TITLE);
	        $('#memo_time').val(location_TIME);
	        $('#memo_place').val(location_NAME);
	        $('#memo_place_lat').val(location_LAT);
	        $('#memo_place_lng').val(location_LNG);
	        $('#memo_content').val(location_MEMO);
	        $('#review_content').val(location_REVIEW);
	        // 다른 필드에 대한 데이터도 출력하십시오.
	    },
	    error: function (xhr, status, error) {
	        console.error("GET 요청 오류: " + error);
	    }
	});
});



// 다섯째 날 일정 클릭
$(document).on('click', ".table-box5 [id^=title]", function () { 

	$(".card-title5").focus();
	
	// 일정표를 클릭하면 메모장 날짜 텍스트 출력
	$('#datepicker').val($("#date5").text());
	
	$(".memo_padding").show(); // 메모장 보이게 하기
	$(".map_div_container").height('1530px');
	$(".advertisement").css("margin-top", "680px");
	
	// 일정표와 메모장의 연결을 위함, 메모장의 제목 텍스트의 아이디 값에 클릭한 일정의 아이디 값 연결함.
	document.querySelector('#memo_text_id').setAttribute("value",$(this).attr('id'));

	// DB에 정상적으로 삽입되었다면, DB에 location_UUID와 location_ID를 확인된다면 출력!
	$.ajax({
	    url: "/location_print",
	    type: "post",
	    dataType: "json", // 이 부분을 수정하지 마십시오
	    traditional: true,
	    data: {
	        "location_UUID": $('#location_uuid').val(),
	        "location_ID": $(this).attr('id')
	    },success: function (data2) {
	        
	        // data2 객체 내의 배열에서 첫 번째 요소 추출
	        var firstItem = data2.data2[0];

	        // 필요한 데이터 추출
	        var location_TITLE = firstItem.location_TITLE; // 메모명
	        var location_TIME = firstItem.location_TIME;
	        var location_NAME = firstItem.location_NAME; // 장소명
	        var location_LAT = firstItem.location_LAT;
	        var location_LNG = firstItem.location_LNG;
	        var location_MEMO = firstItem.location_MEMO;
	        var location_REVIEW = firstItem.location_REVIEW;

	        // HTML 요소에 데이터 출력
	        $('#memo_text').val(location_TITLE);
	        $('#memo_time').val(location_TIME);
	        $('#memo_place').val(location_NAME);
	        $('#memo_place_lat').val(location_LAT);
	        $('#memo_place_lng').val(location_LNG);
	        $('#memo_content').val(location_MEMO);
	        $('#review_content').val(location_REVIEW);
	        // 다른 필드에 대한 데이터도 출력하십시오.
	    },
	    error: function (xhr, status, error) {
	        console.error("GET 요청 오류: " + error);
	    }
	});
});


// 여섯째 날 일정 클릭
$(document).on('click', ".table-box6 [id^=title]", function () { 

	$(".card-title6").focus();
	
	// 일정표를 클릭하면 메모장 날짜 텍스트 출력
	$('#datepicker').val($("#date6").text());
	
	$(".memo_padding").show(); // 메모장 보이게 하기
	$(".map_div_container").height('1530px');
	$(".advertisement").css("margin-top", "680px");
	
	// 일정표와 메모장의 연결을 위함, 메모장의 제목 텍스트의 아이디 값에 클릭한 일정의 아이디 값 연결함.
	document.querySelector('#memo_text_id').setAttribute("value",$(this).attr('id'));

	// DB에 정상적으로 삽입되었다면, DB에 location_UUID와 location_ID를 확인된다면 출력!
	$.ajax({
	    url: "/location_print",
	    type: "post",
	    dataType: "json", // 이 부분을 수정하지 마십시오
	    traditional: true,
	    data: {
	        "location_UUID": $('#location_uuid').val(),
	        "location_ID": $(this).attr('id')
	    },success: function (data2) {
	        
	        // data2 객체 내의 배열에서 첫 번째 요소 추출
	        var firstItem = data2.data2[0];

	        // 필요한 데이터 추출
	        var location_TITLE = firstItem.location_TITLE; // 메모명
	        var location_TIME = firstItem.location_TIME;
	        var location_NAME = firstItem.location_NAME; // 장소명
	        var location_LAT = firstItem.location_LAT;
	        var location_LNG = firstItem.location_LNG;
	        var location_MEMO = firstItem.location_MEMO;
	        var location_REVIEW = firstItem.location_REVIEW;

	        // HTML 요소에 데이터 출력
	        $('#memo_text').val(location_TITLE);
	        $('#memo_time').val(location_TIME);
	        $('#memo_place').val(location_NAME);
	        $('#memo_place_lat').val(location_LAT);
	        $('#memo_place_lng').val(location_LNG);
	        $('#memo_content').val(location_MEMO);
	        $('#review_content').val(location_REVIEW);
	        // 다른 필드에 대한 데이터도 출력하십시오.
	    },
	    error: function (xhr, status, error) {
	        console.error("GET 요청 오류: " + error);
	    }
	});
});


// 일곱번째 날 일정 클릭
$(document).on('click', ".table-box7 [id^=title]", function () { 

	$(".card-title7").focus();
	
	// 일정표를 클릭하면 메모장 날짜 텍스트 출력
	$('#datepicker').val($("#date7").text());
	
	$(".memo_padding").show(); // 메모장 보이게 하기
	$(".map_div_container").height('1530px');
	$(".advertisement").css("margin-top", "680px");
	
	// 일정표와 메모장의 연결을 위함, 메모장의 제목 텍스트의 아이디 값에 클릭한 일정의 아이디 값 연결함.
	document.querySelector('#memo_text_id').setAttribute("value",$(this).attr('id'));

	// DB에 정상적으로 삽입되었다면, DB에 location_UUID와 location_ID를 확인된다면 출력!
	$.ajax({
	    url: "/location_print",
	    type: "post",
	    dataType: "json", // 이 부분을 수정하지 마십시오
	    traditional: true,
	    data: {
	        "location_UUID": $('#location_uuid').val(),
	        "location_ID": $(this).attr('id')
	    },success: function (data2) {
	        
	        // data2 객체 내의 배열에서 첫 번째 요소 추출
	        var firstItem = data2.data2[0];

	        // 필요한 데이터 추출
	        var location_TITLE = firstItem.location_TITLE; // 메모명
	        var location_TIME = firstItem.location_TIME;
	        var location_NAME = firstItem.location_NAME; // 장소명
	        var location_LAT = firstItem.location_LAT;
	        var location_LNG = firstItem.location_LNG;
	        var location_MEMO = firstItem.location_MEMO;
	        var location_REVIEW = firstItem.location_REVIEW;

	        // HTML 요소에 데이터 출력
	        $('#memo_text').val(location_TITLE);
	        $('#memo_time').val(location_TIME);
	        $('#memo_place').val(location_NAME);
	        $('#memo_place_lat').val(location_LAT);
	        $('#memo_place_lng').val(location_LNG);
	        $('#memo_content').val(location_MEMO);
	        $('#review_content').val(location_REVIEW);
	        // 다른 필드에 대한 데이터도 출력하십시오.
	    },
	    error: function (xhr, status, error) {
	        console.error("GET 요청 오류: " + error);
	    }
	});
});


// 메모에 장소명 추가
$(document).on('click', ".place_add", function () { 
	$('#memo_place').val($("._result_text_line_memo_print").text());
	$('#memo_place_lat').val($("#_result_text_line_memo_lat").text());
	$('#memo_place_lng').val($("#_result_text_line_memo_lng").text());
});


// UUID 범용고유식별자 생성
function uuidv4() {
	  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
	    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	  );
	}
	document.getElementById('location_uuid').value = uuidv4();
	console.log("범용고유식별자 : " + $('#location_uuid').val());
	

// 일정표 DB 저장
$(document).on('click', "#travel_save", function () { 
	document.getElementById("modal").style.display="block";
});

	$(document).on('click', "#save_btn", function () { 
	// 메모장과 일정표를 이어주는 기능
	// 원하는 위치의 일정을 클릭 후 메모장의 제목을 입력한다 -> 일정 저장 버튼을 클릭하면 선택한 일정표의 이름이 바뀐다.
	var memo_text = document.getElementById("memo_text").value;
	var memo_text_id = document.getElementById("memo_text_id").value;
	var datepicker = document.getElementById("datepicker").value;
	var memo_time = document.getElementById("memo_time").value;
	var memo_place = document.getElementById("memo_place").value;
	var memo_place_lat = document.getElementById("memo_place_lat").value; // 위도
	var memo_place_lng = document.getElementById("memo_place_lng").value; // 경도
	var memo_content = document.getElementById("memo_content").value;
	var review_content = document.getElementById("review_content").value;

	
	// id가 "memo_text_id"인 요소의 값을 가져옴
    var memo_text_id = $("#memo_text_id").val();
    
    // id가 특정 패턴 [id^=title1_]를 가지는 엘리먼트에 대해 조건문 실행
    $('.table-box1 [id^=title]').each(function() {
        // 현재 요소의 id 속성 값을 가져옴
        var idValue = $(this).attr('id');
        
        // 특정 패턴과 일치하고 memo_text_id와 같은 경우 조건문 실행
        if (memo_text_id === idValue) {
            // 여기에 조건문이 실행될 코드 작성
        	travel_memo_array[0] = idValue; // 메모의 위치(= 일정표 아이디)
        	travel_memo_array[1] = memo_text; // 제목
        	travel_memo_array[2] = datepicker; // 날짜
        	travel_memo_array[3] = memo_time; // 시간
        	travel_memo_array[4] = memo_place; // 장소명
        	travel_memo_array[5] = memo_place_lat; // 위도
        	travel_memo_array[6] = memo_place_lng; // 경도
        	travel_memo_array[7] = memo_content; // 내용
        	travel_memo_array[8] = review_content; // 리뷰
        	

        }
    });
    
    
	// 일정표 배열 출력 (forEach)
	const items = $(".table-box1 [id^=title]");
	  const itemList = [];
	  var fixedSize = 26;

	  // 일정의 아이디와 텍스트를 배열 저장
	  // 일정의 아이디는 메모장 배열과 연관이 있기때문이다.
	itemList.push("table-box1");
	  
	itemList.push($("#travel_title").val());
	
	// 메모장에 쓴 제목 일정표에 삽입
	$("#"+memo_text_id).text(memo_text);
	
	  items.each(function() {
		itemList.push($(this).attr('id'));
	    itemList.push($(this).text());
	  });
	  
	// 동적 배열을 복사하여 새로운 배열 생성
  itemList_copy = itemList.slice();
  
// 필요한 경우 null 값으로 채우기
  while (itemList_copy.length < fixedSize) {
	  itemList_copy.push(null);
  }

    
    // id가 특정 패턴 [id^=title2_]를 가지는 엘리먼트에 대해 조건문 실행
    $('.table-box2 [id^=title]').each(function() {
        // 현재 요소의 id 속성 값을 가져옴
        var idValue = $(this).attr('id');
        
        // 특정 패턴과 일치하고 memo_text_id와 같은 경우 조건문 실행
        if (memo_text_id === idValue) {
            // 여기에 조건문이 실행될 코드 작성
        	travel_memo_array[0] = idValue; // 메모의 위치(= 일정표 아이디)
        	travel_memo_array[1] = memo_text; // 제목
        	travel_memo_array[2] = datepicker; // 날짜
        	travel_memo_array[3] = memo_time; // 시간
        	travel_memo_array[4] = memo_place; // 장소명
        	travel_memo_array[5] = memo_place_lat; // 위도
        	travel_memo_array[6] = memo_place_lng; // 경도
        	travel_memo_array[7] = memo_content; // 내용
        	travel_memo_array[8] = review_content; // 리뷰
			}
        });
	// 일정표 배열 출력 (forEach)
	const items2 = $(".table-box2 [id^=title]");
	  const itemList2 = [];
	  var fixedSize2 = 26;

	  // 일정의 아이디와 텍스트를 배열 저장
	  // 일정의 아이디는 메모장 배열과 연관이 있기때문이다.
	itemList2.push("table-box2");
	
	itemList2.push($("#travel_title").val());
	
	// 메모장에 쓴 제목 일정표에 삽입
	$("#"+memo_text_id).text(memo_text);
	
	  items2.each(function() {
		itemList2.push($(this).attr('id'));
	    itemList2.push($(this).text());
	  });

	// 동적 배열을 복사하여 새로운 배열 생성
  itemList_copy2 = itemList2.slice();
  
// 필요한 경우 null 값으로 채우기
  while (itemList_copy2.length < fixedSize2) {
	  itemList_copy2.push(null);
  }
  
  
    
 // id가 특정 패턴 [id^=title3_]를 가지는 엘리먼트에 대해 조건문 실행
    $('.table-box3 [id^=title]').each(function() {
        // 현재 요소의 id 속성 값을 가져옴
        var idValue = $(this).attr('id');
        
        // 특정 패턴과 일치하고 memo_text_id와 같은 경우 조건문 실행
        if (memo_text_id === idValue) {
            // 여기에 조건문이 실행될 코드 작성
        	travel_memo_array[0] = idValue; // 메모의 위치(= 일정표 아이디)
        	travel_memo_array[1] = memo_text; // 제목
        	travel_memo_array[2] = datepicker; // 날짜
        	travel_memo_array[3] = memo_time; // 시간
        	travel_memo_array[4] = memo_place; // 장소명
        	travel_memo_array[5] = memo_place_lat; // 위도
        	travel_memo_array[6] = memo_place_lng; // 경도
        	travel_memo_array[7] = memo_content; // 내용
        	travel_memo_array[8] = review_content; // 리뷰
			}
        });
    
	// 일정표 배열 출력 (forEach)
	const items3 = $(".table-box3 [id^=title]");
	  const itemList3 = [];
	  var fixedSize3 = 26;

	  // 일정의 아이디와 텍스트를 배열 저장
	  // 일정의 아이디는 메모장 배열과 연관이 있기때문이다.
	itemList3.push("table-box3");
	
	itemList3.push($("#travel_title").val());
	
	// 메모장에 쓴 제목 일정표에 삽입
	$("#"+memo_text_id).text(memo_text);
	
	  items3.each(function() {
		itemList3.push($(this).attr('id'));
	    itemList3.push($(this).text());
	  });

	// 동적 배열을 복사하여 새로운 배열 생성
  itemList_copy3 = itemList3.slice();
  
// 필요한 경우 null 값으로 채우기
  while (itemList_copy3.length < fixedSize3) {
	  itemList_copy3.push(null);
  }
  
  
  
  // id가 특정 패턴 [id^=title4_]를 가지는 엘리먼트에 대해 조건문 실행
  $('.table-box4 [id^=title]').each(function() {
      // 현재 요소의 id 속성 값을 가져옴
      var idValue = $(this).attr('id');
      
      // 특정 패턴과 일치하고 memo_text_id와 같은 경우 조건문 실행
      if (memo_text_id === idValue) {
          // 여기에 조건문이 실행될 코드 작성
      	travel_memo_array[0] = idValue; // 메모의 위치(= 일정표 아이디)
      	travel_memo_array[1] = memo_text; // 제목
      	travel_memo_array[2] = datepicker; // 날짜
      	travel_memo_array[3] = memo_time; // 시간
      	travel_memo_array[4] = memo_place; // 장소명
      	travel_memo_array[5] = memo_place_lat; // 위도
      	travel_memo_array[6] = memo_place_lng; // 경도
      	travel_memo_array[7] = memo_content; // 내용
      	travel_memo_array[8] = review_content; // 리뷰
			}
      });
	// 일정표 배열 출력 (forEach)
	const items4 = $(".table-box4 [id^=title]");
	  const itemList4 = [];
	  var fixedSize4 = 26;

	  // 일정의 아이디와 텍스트를 배열 저장
	  // 일정의 아이디는 메모장 배열과 연관이 있기때문이다.
	itemList4.push("table-box4");
	
	itemList4.push($("#travel_title").val());
	
	// 메모장에 쓴 제목 일정표에 삽입
	$("#"+memo_text_id).text(memo_text);
	
	  items4.each(function() {
		itemList4.push($(this).attr('id'));
	    itemList4.push($(this).text());
	  });

	// 동적 배열을 복사하여 새로운 배열 생성
itemList_copy4 = itemList4.slice();

// 필요한 경우 null 값으로 채우기
while (itemList_copy4.length < fixedSize4) {
	  itemList_copy4.push(null);
}



// id가 특정 패턴 [id^=title5_]를 가지는 엘리먼트에 대해 조건문 실행
$('.table-box5 [id^=title]').each(function() {
    // 현재 요소의 id 속성 값을 가져옴
    var idValue = $(this).attr('id');
    
    // 특정 패턴과 일치하고 memo_text_id와 같은 경우 조건문 실행
    if (memo_text_id === idValue) {
        // 여기에 조건문이 실행될 코드 작성
    	travel_memo_array[0] = idValue; // 메모의 위치(= 일정표 아이디)
    	travel_memo_array[1] = memo_text; // 제목
    	travel_memo_array[2] = datepicker; // 날짜
    	travel_memo_array[3] = memo_time; // 시간
    	travel_memo_array[4] = memo_place; // 장소명
    	travel_memo_array[5] = memo_place_lat; // 위도
    	travel_memo_array[6] = memo_place_lng; // 경도
    	travel_memo_array[7] = memo_content; // 내용
    	travel_memo_array[8] = review_content; // 리뷰
			}
    });
	// 일정표 배열 출력 (forEach)
	const items5 = $(".table-box5 [id^=title]");
	  const itemList5 = [];
	  var fixedSize5 = 26;

	  // 일정의 아이디와 텍스트를 배열 저장
	  // 일정의 아이디는 메모장 배열과 연관이 있기때문이다.
	itemList5.push("table-box5");
	
	itemList5.push($("#travel_title").val());
	
	// 메모장에 쓴 제목 일정표에 삽입
	$("#"+memo_text_id).text(memo_text);
	
	  items5.each(function() {
		itemList5.push($(this).attr('id'));
	    itemList5.push($(this).text());
	  });

	// 동적 배열을 복사하여 새로운 배열 생성
itemList_copy5 = itemList5.slice();

// 필요한 경우 null 값으로 채우기
while (itemList_copy5.length < fixedSize5) {
	  itemList_copy5.push(null);
}



// id가 특정 패턴 [id^=title6_]를 가지는 엘리먼트에 대해 조건문 실행
$('.table-box6 [id^=title]').each(function() {
    // 현재 요소의 id 속성 값을 가져옴
    var idValue = $(this).attr('id');
    
    // 특정 패턴과 일치하고 memo_text_id와 같은 경우 조건문 실행
    if (memo_text_id === idValue) {
        // 여기에 조건문이 실행될 코드 작성
    	travel_memo_array[0] = idValue; // 메모의 위치(= 일정표 아이디)
    	travel_memo_array[1] = memo_text; // 제목
    	travel_memo_array[2] = datepicker; // 날짜
    	travel_memo_array[3] = memo_time; // 시간
    	travel_memo_array[4] = memo_place; // 장소명
    	travel_memo_array[5] = memo_place_lat; // 위도
    	travel_memo_array[6] = memo_place_lng; // 경도
    	travel_memo_array[7] = memo_content; // 내용
    	travel_memo_array[8] = review_content; // 리뷰
			}
    });
	// 일정표 배열 출력 (forEach)
	const items6 = $(".table-box6 [id^=title]");
	  const itemList6 = [];
	  var fixedSize6 = 26;

	  // 일정의 아이디와 텍스트를 배열 저장
	  // 일정의 아이디는 메모장 배열과 연관이 있기때문이다.
	itemList6.push("table-box6");
	
	itemList6.push($("#travel_title").val());
	
	// 메모장에 쓴 제목 일정표에 삽입
	$("#"+memo_text_id).text(memo_text);
	
	  items6.each(function() {
		itemList6.push($(this).attr('id'));
	    itemList6.push($(this).text());
	  });

	// 동적 배열을 복사하여 새로운 배열 생성
itemList_copy6 = itemList6.slice();

// 필요한 경우 null 값으로 채우기
while (itemList_copy6.length < fixedSize6) {
	  itemList_copy6.push(null);
}



// id가 특정 패턴 [id^=title7_]를 가지는 엘리먼트에 대해 조건문 실행
$('.table-box7 [id^=title]').each(function() {
    // 현재 요소의 id 속성 값을 가져옴
    var idValue = $(this).attr('id');
    
    // 특정 패턴과 일치하고 memo_text_id와 같은 경우 조건문 실행
    if (memo_text_id === idValue) {
        // 여기에 조건문이 실행될 코드 작성
    	travel_memo_array[0] = idValue; // 메모의 위치(= 일정표 아이디)
    	travel_memo_array[1] = memo_text; // 제목
    	travel_memo_array[2] = datepicker; // 날짜
    	travel_memo_array[3] = memo_time; // 시간
    	travel_memo_array[4] = memo_place; // 장소명
    	travel_memo_array[5] = memo_place_lat; // 위도
    	travel_memo_array[6] = memo_place_lng; // 경도
    	travel_memo_array[7] = memo_content; // 내용
    	travel_memo_array[8] = review_content; // 리뷰
			}
    });
	// 일정표 배열 출력 (forEach)
	const items7 = $(".table-box7 [id^=title]");
	  const itemList7 = [];
	  var fixedSize7 = 26;

	  // 일정의 아이디와 텍스트를 배열 저장
	  // 일정의 아이디는 메모장 배열과 연관이 있기때문이다.
	itemList7.push("table-box7");
	
	itemList7.push($("#travel_title").val());
	
	// 메모장에 쓴 제목 일정표에 삽입
	$("#"+memo_text_id).text(memo_text);
	
	  items7.each(function() {
		itemList7.push($(this).attr('id'));
	    itemList7.push($(this).text());
	  });

	// 동적 배열을 복사하여 새로운 배열 생성
itemList_copy7 = itemList7.slice();

// 필요한 경우 null 값으로 채우기
while (itemList_copy7.length < fixedSize7) {
	  itemList_copy7.push(null);
}


    
  // 아이디 중복검사
    // #location_uuid에 입력되는 값
    var location_uuid = $('#location_uuid').val();

    if (location_uuid != "") {

        $('.final_id_ck').css('display', 'none');

        var data = {
            location_UUID: location_uuid,
            location_ID : travel_memo_array[0],
            schedule_UUID: location_uuid,
            schedule_ID: itemList_copy[0]
        };
        

        $.ajax({
            type: "post",
            // url : "/member/memberIdChk", 이건 경로를 설정하는 거니까 뒤에있는 IdChk 메소드가 어느
			// 위치에 있는 어떤 파일인지를 보고 작성할 것
            url: "/IdChk",
            data: data,
            success: function (result) {
                // result = 0이면 , success, 새로저장
                if (result == 'location_true_modify') {
                	
                	// uuid 중복이 없는 경우
                	if(itemList_copy[0].includes('table-box1')){
                	// 중복 데이터가 없으면 저장
                		// POST 요청으로 데이터를 전송
                		$.ajax({
                		    url: "/Plan_to_travel_location",
                		    type: "post",
                		    dataType: "json", // 이 부분을 수정하지 마십시오
                		    traditional: true,
                		    data: {
                		        "arrStr": travel_memo_array,
                		        "location_UUID": $('#location_uuid').val(),
                		        "schedule_UUID": $('#location_uuid').val(),
                		        "schedule_ID": itemList_copy[0],
                		        "location_ID": travel_memo_array[0],
                		        "schdule_itemList": itemList_copy,
                		    },
        		    	    error: function (xhr, status, error) {
        		    	        console.error("GET 요청 오류: " + error);
        		    	    },
                		});
                    
                	} else if (itemList_copy2[0].includes('table-box2')) {
                		$.ajax({
                      		url: "/Plan_to_travel_location",
                      		type: "post",
                      		traditional: true,	// ajax 배열 넘기기 옵션!
                      		data: {
                      			"arrStr": travel_memo_array,
                		        "location_UUID": $('#location_uuid').val(),
                		        "schedule_UUID": $('#location_uuid').val(),
                		        "schedule_ID": itemList_copy2[0],
                		        "location_ID": travel_memo_array[0],
                		        "schdule_itemList": itemList_copy2}, // 일정표를
																		// 추가하면
																		// 배열에
																		// 저장됨
                      		dataType: "json"
                      	});
                	} else if (itemList_copy3[0].includes('table-box3')) {
                		$.ajax({
                      		url: "/Plan_to_travel_location",
                      		type: "post",
                      		traditional: true,	// ajax 배열 넘기기 옵션!
                      		data: {
                      			"arrStr": travel_memo_array,
                		        "location_UUID": $('#location_uuid').val(),
                		        "schedule_UUID": $('#location_uuid').val(),
                		        "schedule_ID": itemList_copy3[0],
                		        "location_ID": travel_memo_array[0],
                		        "schdule_itemList": itemList_copy3}, // 일정표를
																		// 추가하면
																		// 배열에
																		// 저장됨
                      		dataType: "json"
                      	});
                	} else if (itemList_copy4[0].includes('table-box4')) {
                		$.ajax({
                      		url: "/Plan_to_travel_location",
                      		type: "post",
                      		traditional: true,	// ajax 배열 넘기기 옵션!
                      		data: {
                      			"arrStr": travel_memo_array,
                		        "location_UUID": $('#location_uuid').val(),
                		        "schedule_UUID": $('#location_uuid').val(),
                		        "schedule_ID": itemList_copy4[0],
                		        "location_ID": travel_memo_array[0],
                		        "schdule_itemList": itemList_copy4}, // 일정표를
																		// 추가하면
																		// 배열에
																		// 저장됨
                      		dataType: "json"
                      	});
                	} else if (itemList_copy5[0].includes('table-box5')) {
                		$.ajax({
                      		url: "/Plan_to_travel_location",
                      		type: "post",
                      		traditional: true,	// ajax 배열 넘기기 옵션!
                      		data: {
                      			"arrStr": travel_memo_array,
                		        "location_UUID": $('#location_uuid').val(),
                		        "schedule_UUID": $('#location_uuid').val(),
                		        "schedule_ID": itemList_copy5[0],
                		        "location_ID": travel_memo_array[0],
                		        "schdule_itemList": itemList_copy5}, // 일정표를
																		// 추가하면
																		// 배열에
																		// 저장됨
                      		dataType: "json"
                      	});
                	} else if (itemList_copy6[0].includes('table-box6')) {
                		$.ajax({
                      		url: "/Plan_to_travel_location",
                      		type: "post",
                      		traditional: true,	// ajax 배열 넘기기 옵션!
                      		data: {
                      			"arrStr": travel_memo_array,
                		        "location_UUID": $('#location_uuid').val(),
                		        "schedule_UUID": $('#location_uuid').val(),
                		        "schedule_ID": itemList_copy6[0],
                		        "location_ID": travel_memo_array[0],
                		        "schdule_itemList": itemList_copy6}, // 일정표를
																		// 추가하면
																		// 배열에
																		// 저장됨
                      		dataType: "json"
                      	});
                	} else if (itemList_copy7[0].includes('table-box7')) {
                		$.ajax({
                      		url: "/Plan_to_travel_location",
                      		type: "post",
                      		traditional: true,	// ajax 배열 넘기기 옵션!
                      		data: {
                      			"arrStr": travel_memo_array,
                		        "location_UUID": $('#location_uuid').val(),
                		        "schedule_UUID": $('#location_uuid').val(),
                		        "schedule_ID": itemList_copy7[0],
                		        "location_ID": travel_memo_array[0],
                		        "schdule_itemList": itemList_copy7}, // 일정표를
																		// 추가하면
																		// 배열에
																		// 저장됨
                      		dataType: "json"
                      	});
                	} else {
                		console.log("안되잖아..");
                	}
                }
                
                
               	 
  
                
                if (result == 'location_false_modify') {
                	// uuid 중복이 없는 경우
                	if(itemList_copy[0].includes('table-box1')){
                	// 중복 데이터가 없으면 저장
                		// POST 요청으로 데이터를 전송
                		$.ajax({
                		    url: "/change",
                		    type: "post",
                		    dataType: "json", // 이 부분을 수정하지 마십시오
                		    traditional: true,
                		    data: {
                		        "arrStr": travel_memo_array,
                		        "location_UUID": $('#location_uuid').val(),
                		        "schedule_UUID": $('#location_uuid').val(),
                		        "schedule_ID": itemList_copy[0],
                		        "location_ID": travel_memo_array[0],
                		        "schdule_itemList": itemList_copy,
                		    },
        		    	    error: function (xhr, status, error) {
        		    	        console.error("GET 요청 오류: " + error);
        		    	    },
                		});
                    
                	} else if (itemList_copy2[0].includes('table-box2')) {
                		$.ajax({
                      		url: "/change",
                      		type: "post",
                      		traditional: true,	// ajax 배열 넘기기 옵션!
                      		data: {
                      			"arrStr": travel_memo_array,
                		        "location_UUID": $('#location_uuid').val(),
                		        "schedule_UUID": $('#location_uuid').val(),
                		        "schedule_ID": itemList_copy2[0],
                		        "location_ID": travel_memo_array[0],
                		        "schdule_itemList": itemList_copy2}, // 일정표를
																		// 추가하면
																		// 배열에
																		// 저장됨
                      		dataType: "json"
                      	});
                	} else if (itemList_copy3[0].includes('table-box3')) {
                		$.ajax({
                      		url: "/change",
                      		type: "post",
                      		traditional: true,	// ajax 배열 넘기기 옵션!
                      		data: {
                      			"arrStr": travel_memo_array,
                		        "location_UUID": $('#location_uuid').val(),
                		        "schedule_UUID": $('#location_uuid').val(),
                		        "schedule_ID": itemList_copy3[0],
                		        "location_ID": travel_memo_array[0],
                		        "schdule_itemList": itemList_copy3}, // 일정표를
																		// 추가하면
																		// 배열에
																		// 저장됨
                      		dataType: "json"
                      	});
                	} else if (itemList_copy4[0].includes('table-box4')) {
                		$.ajax({
                      		url: "/change",
                      		type: "post",
                      		traditional: true,	// ajax 배열 넘기기 옵션!
                      		data: {
                      			"arrStr": travel_memo_array,
                		        "location_UUID": $('#location_uuid').val(),
                		        "schedule_UUID": $('#location_uuid').val(),
                		        "schedule_ID": itemList_copy4[0],
                		        "location_ID": travel_memo_array[0],
                		        "schdule_itemList": itemList_copy4}, // 일정표를
																		// 추가하면
																		// 배열에
																		// 저장됨
                      		dataType: "json"
                      	});
                	} else if (itemList_copy5[0].includes('table-box5')) {
                		$.ajax({
                      		url: "/change",
                      		type: "post",
                      		traditional: true,	// ajax 배열 넘기기 옵션!
                      		data: {
                      			"arrStr": travel_memo_array,
                		        "location_UUID": $('#location_uuid').val(),
                		        "schedule_UUID": $('#location_uuid').val(),
                		        "schedule_ID": itemList_copy5[0],
                		        "location_ID": travel_memo_array[0],
                		        "schdule_itemList": itemList_copy5}, // 일정표를
																		// 추가하면
																		// 배열에
																		// 저장됨
                      		dataType: "json"
                      	});
                	} else if (itemList_copy6[0].includes('table-box6')) {
                		$.ajax({
                      		url: "/change",
                      		type: "post",
                      		traditional: true,	// ajax 배열 넘기기 옵션!
                      		data: {
                      			"arrStr": travel_memo_array,
                		        "location_UUID": $('#location_uuid').val(),
                		        "schedule_UUID": $('#location_uuid').val(),
                		        "schedule_ID": itemList_copy6[0],
                		        "location_ID": travel_memo_array[0],
                		        "schdule_itemList": itemList_copy6}, // 일정표를
																		// 추가하면
																		// 배열에
																		// 저장됨
                      		dataType: "json"
                      	});
                	} else if (itemList_copy7[0].includes('table-box7')) {
                		$.ajax({
                      		url: "/change",
                      		type: "post",
                      		traditional: true,	// ajax 배열 넘기기 옵션!
                      		data: {
                      			"arrStr": travel_memo_array,
                		        "location_UUID": $('#location_uuid').val(),
                		        "schedule_UUID": $('#location_uuid').val(),
                		        "schedule_ID": itemList_copy7[0],
                		        "location_ID": travel_memo_array[0],
                		        "schdule_itemList": itemList_copy7}, // 일정표를
																		// 추가하면
																		// 배열에
																		// 저장됨
                      		dataType: "json"
                      	});
                	} else {
                		console.log("안되잖아..");
                	}	
                }
 
            } // success 종료
        
        

        }); // ajax 종료
        
        $.ajax({
            type: "post",
            // url : "/member/memberIdChk", 이건 경로를 설정하는 거니까 뒤에있는 IdChk 메소드가 어느
			// 위치에 있는 어떤 파일인지를 보고 작성할 것
            url: "/modifyChk",
            data: data,
            success: function (result) {
                // result = 0이면 , success, 새로저장
           	 	if (result == 'schedule_true_modify') {
               	// POST 요청으로 데이터를 전송
           	 	if (itemList_copy[0].includes('table-box1')) {
             		$.ajax({
             		    url: "/Plan_to_travel_schedule",
             		    type: "post",
             		    dataType: "json", // 이 부분을 수정하지 마십시오
             		    traditional: true,
             		    data: {
             		        "arrStr": travel_memo_array,
             		        "location_UUID": $('#location_uuid').val(),
             		        "schedule_UUID": $('#location_uuid').val(),
             		        "schedule_ID": itemList_copy[0],
             		        "location_ID": travel_memo_array[0],
             		        "schdule_itemList": itemList_copy,
             		    },
     		    	    error: function (xhr, status, error) {
     		    	        console.error("GET 요청 오류: " + error);
     		    	    },
             		});
                 
             	}
                } 	
           	 	
           	 	if (result == 'schedule_false_modify') {
                   	if (itemList_copy[0].includes('table-box1')) {
                    		$.ajax({
                    		    url: "/schedule_change",
                    		    type: "post",
                    		    dataType: "json", // 이 부분을 수정하지 마십시오
                    		    traditional: true,
                    		    data: {
                    		        "arrStr": travel_memo_array,
                    		        "location_UUID": $('#location_uuid').val(),
                    		        "schedule_UUID": $('#location_uuid').val(),
                    		        "schedule_ID": itemList_copy[0],
                    		        "location_ID": travel_memo_array[0],
                    		        "schdule_itemList": itemList_copy,
                    		    },
            		    	    error: function (xhr, status, error) {
            		    	        console.error("GET 요청 오류: " + error);
            		    	    },
                    		});
                    		
                    		$.ajax({
                        		url: "/schedule_change",
                        		type: "post",
                        		traditional: true,	// ajax 배열 넘기기 옵션!
                        		data: {
                        			"arrStr": travel_memo_array,
                  		        "location_UUID": $('#location_uuid').val(),
                  		        "schedule_UUID": $('#location_uuid').val(),
                  		        "schedule_ID": itemList_copy2[0],
                  		        "location_ID": travel_memo_array[0],
                  		        "schdule_itemList": itemList_copy2}, // 일정표를
																		// 추가하면
																		// 배열에
																		// 저장됨
                        		dataType: "json"
                        	});
                        
                     		$.ajax({
                       		    url: "/schedule_change",
                       		    type: "post",
                       		    dataType: "json", // 이 부분을 수정하지 마십시오
                       		    traditional: true,
                       		    data: {
                       		        "arrStr": travel_memo_array,
                       		        "location_UUID": $('#location_uuid').val(),
                       		        "schedule_UUID": $('#location_uuid').val(),
                       		        "schedule_ID": itemList_copy3[0],
                       		        "location_ID": travel_memo_array[0],
                       		        "schdule_itemList": itemList_copy3,
                       		    },
               		    	    error: function (xhr, status, error) {
               		    	        console.error("GET 요청 오류: " + error);
               		    	    },
                       		});
                     		
                     		
                     		$.ajax({
                       		    url: "/schedule_change",
                       		    type: "post",
                       		    dataType: "json", // 이 부분을 수정하지 마십시오
                       		    traditional: true,
                       		    data: {
                       		        "arrStr": travel_memo_array,
                       		        "location_UUID": $('#location_uuid').val(),
                       		        "schedule_UUID": $('#location_uuid').val(),
                       		        "schedule_ID": itemList_copy4[0],
                       		        "location_ID": travel_memo_array[0],
                       		        "schdule_itemList": itemList_copy4,
                       		    },
               		    	    error: function (xhr, status, error) {
               		    	        console.error("GET 요청 오류: " + error);
               		    	    },
                       		});
                     		
                     		
                     		$.ajax({
                       		    url: "/schedule_change",
                       		    type: "post",
                       		    dataType: "json", // 이 부분을 수정하지 마십시오
                       		    traditional: true,
                       		    data: {
                       		        "arrStr": travel_memo_array,
                       		        "location_UUID": $('#location_uuid').val(),
                       		        "schedule_UUID": $('#location_uuid').val(),
                       		        "schedule_ID": itemList_copy5[0],
                       		        "location_ID": travel_memo_array[0],
                       		        "schdule_itemList": itemList_copy5,
                       		    },
               		    	    error: function (xhr, status, error) {
               		    	        console.error("GET 요청 오류: " + error);
               		    	    },
                       		});
                     		
                     		$.ajax({
                       		    url: "/schedule_change",
                       		    type: "post",
                       		    dataType: "json", // 이 부분을 수정하지 마십시오
                       		    traditional: true,
                       		    data: {
                       		        "arrStr": travel_memo_array,
                       		        "location_UUID": $('#location_uuid').val(),
                       		        "schedule_UUID": $('#location_uuid').val(),
                       		        "schedule_ID": itemList_copy6[0],
                       		        "location_ID": travel_memo_array[0],
                       		        "schdule_itemList": itemList_copy6,
                       		    },
               		    	    error: function (xhr, status, error) {
               		    	        console.error("GET 요청 오류: " + error);
               		    	    },
                       		});
                     		
                     		$.ajax({
                       		    url: "/schedule_change",
                       		    type: "post",
                       		    dataType: "json", // 이 부분을 수정하지 마십시오
                       		    traditional: true,
                       		    data: {
                       		        "arrStr": travel_memo_array,
                       		        "location_UUID": $('#location_uuid').val(),
                       		        "schedule_UUID": $('#location_uuid').val(),
                       		        "schedule_ID": itemList_copy7[0],
                       		        "location_ID": travel_memo_array[0],
                       		        "schdule_itemList": itemList_copy7,
                       		    },
               		    	    error: function (xhr, status, error) {
               		    	        console.error("GET 요청 오류: " + error);
               		    	    },
                       		});
                    	}
           	 	}	 		 	
            }
   	 });
        
        
        
   	 $.ajax({
         type: "post",
         // url : "/member/memberIdChk", 이건 경로를 설정하는 거니까 뒤에있는 IdChk 메소드가 어느
			// 위치에 있는 어떤 파일인지를 보고 작성할 것
         url: "/modifyChk2",
         data: data,
         success: function (result) {
             // result = 0이면 , success, 새로저장
     	 	if (result == 'schedule_true_modify2') {
         	// POST 요청으로 데이터를 전송
     	 	 if (itemList_copy2[0].includes('table-box2')) {
       		$.ajax({
             		url: "/Plan_to_travel_schedule",
             		type: "post",
             		traditional: true,	// ajax 배열 넘기기 옵션!
             		data: {
             			"arrStr": travel_memo_array,
       		        "location_UUID": $('#location_uuid').val(),
       		        "schedule_UUID": $('#location_uuid').val(),
       		        "schedule_ID": itemList_copy2[0],
       		        "location_ID": travel_memo_array[0],
       		        "schdule_itemList": itemList_copy2}, // 일정표를 추가하면 배열에 저장됨
             		dataType: "json"
             	});
       		
       		
       	} else {
       		console.log("안되잖아..");
          }
          } 	
     	 	
     	 	if (result == 'schedule_false_modify2') { 
             	if (itemList_copy2[0].includes('table-box2')) {
              		$.ajax({
                    		url: "/schedule_change",
                    		type: "post",
                    		traditional: true,	// ajax 배열 넘기기 옵션!
                    		data: {
                    			"arrStr": travel_memo_array,
              		        "location_UUID": $('#location_uuid').val(),
              		        "schedule_UUID": $('#location_uuid').val(),
              		        "schedule_ID": itemList_copy2[0],
              		        "location_ID": travel_memo_array[0],
              		        "schdule_itemList": itemList_copy2}, // 일정표를 추가하면
																	// 배열에 저장됨
                    		dataType: "json"
                    	});
              		
              		
              		$.ajax({
            		    url: "/schedule_change",
            		    type: "post",
            		    dataType: "json", // 이 부분을 수정하지 마십시오
            		    traditional: true,
            		    data: {
            		        "arrStr": travel_memo_array,
            		        "location_UUID": $('#location_uuid').val(),
            		        "schedule_UUID": $('#location_uuid').val(),
            		        "schedule_ID": itemList_copy[0],
            		        "location_ID": travel_memo_array[0],
            		        "schdule_itemList": itemList_copy,
            		    },
    		    	    error: function (xhr, status, error) {
    		    	        console.error("GET 요청 오류: " + error);
    		    	    },
            		});
              		
              		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy3[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy3,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy4[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy4,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy5[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy5,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy6[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy6,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy7[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy7,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
              	}
     	 	}
         }
	 });
   	 
   	 
   	 
   	$.ajax({
        type: "post",
        // url : "/member/memberIdChk", 이건 경로를 설정하는 거니까 뒤에있는 IdChk 메소드가 어느 위치에
		// 있는 어떤 파일인지를 보고 작성할 것
        url: "/modifyChk3",
        data: data,
        success: function (result) {
            // result = 0이면 , success, 새로저장
    	 	if (result == 'schedule_true_modify3') {
        	// POST 요청으로 데이터를 전송
    	 	 if (itemList_copy3[0].includes('table-box3')) {
      		$.ajax({
            		url: "/Plan_to_travel_schedule",
            		type: "post",
            		traditional: true,	// ajax 배열 넘기기 옵션!
            		data: {
            			"arrStr": travel_memo_array,
      		        "location_UUID": $('#location_uuid').val(),
      		        "schedule_UUID": $('#location_uuid').val(),
      		        "schedule_ID": itemList_copy3[0],
      		        "location_ID": travel_memo_array[0],
      		        "schdule_itemList": itemList_copy3}, // 일정표를 추가하면 배열에 저장됨
            		dataType: "json"
            	});
      		
      		
      	} else {
      		console.log("안되잖아..");
         }
         } 	
    	 	
    	 	if (result == 'schedule_false_modify3') { 
            	if (itemList_copy3[0].includes('table-box3')) {
             		$.ajax({
                   		url: "/schedule_change",
                   		type: "post",
                   		traditional: true,	// ajax 배열 넘기기 옵션!
                   		data: {
                   			"arrStr": travel_memo_array,
             		        "location_UUID": $('#location_uuid').val(),
             		        "schedule_UUID": $('#location_uuid').val(),
             		        "schedule_ID": itemList_copy2[0],
             		        "location_ID": travel_memo_array[0],
             		        "schdule_itemList": itemList_copy2}, // 일정표를 추가하면
																	// 배열에 저장됨
                   		dataType: "json"
                   	});
             		
             		
             		$.ajax({
           		    url: "/schedule_change",
           		    type: "post",
           		    dataType: "json", // 이 부분을 수정하지 마십시오
           		    traditional: true,
           		    data: {
           		        "arrStr": travel_memo_array,
           		        "location_UUID": $('#location_uuid').val(),
           		        "schedule_UUID": $('#location_uuid').val(),
           		        "schedule_ID": itemList_copy[0],
           		        "location_ID": travel_memo_array[0],
           		        "schdule_itemList": itemList_copy,
           		    },
   		    	    error: function (xhr, status, error) {
   		    	        console.error("GET 요청 오류: " + error);
   		    	    },
           		});
             		
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy3[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy3,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy4[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy4,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy5[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy5,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy6[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy6,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy7[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy7,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             	}
    	 	}
        }
	 });
   	
   	
   	$.ajax({
        type: "post",
        // url : "/member/memberIdChk", 이건 경로를 설정하는 거니까 뒤에있는 IdChk 메소드가 어느 위치에
		// 있는 어떤 파일인지를 보고 작성할 것
        url: "/modifyChk4",
        data: data,
        success: function (result) {
            // result = 0이면 , success, 새로저장
    	 	if (result == 'schedule_true_modify4') {
        	// POST 요청으로 데이터를 전송
    	 	 if (itemList_copy4[0].includes('table-box4')) {
      		$.ajax({
            		url: "/Plan_to_travel_schedule",
            		type: "post",
            		traditional: true,	// ajax 배열 넘기기 옵션!
            		data: {
            			"arrStr": travel_memo_array,
      		        "location_UUID": $('#location_uuid').val(),
      		        "schedule_UUID": $('#location_uuid').val(),
      		        "schedule_ID": itemList_copy4[0],
      		        "location_ID": travel_memo_array[0],
      		        "schdule_itemList": itemList_copy4}, // 일정표를 추가하면 배열에 저장됨
            		dataType: "json"
            	});
      		
      		
      	} else {
      		console.log("안되잖아..");
         }
         } 	
    	 	
    	 	if (result == 'schedule_false_modify4') { 
            	if (itemList_copy4[0].includes('table-box4')) {
             		$.ajax({
                   		url: "/schedule_change",
                   		type: "post",
                   		traditional: true,	// ajax 배열 넘기기 옵션!
                   		data: {
                   			"arrStr": travel_memo_array,
             		        "location_UUID": $('#location_uuid').val(),
             		        "schedule_UUID": $('#location_uuid').val(),
             		        "schedule_ID": itemList_copy2[0],
             		        "location_ID": travel_memo_array[0],
             		        "schdule_itemList": itemList_copy2}, // 일정표를 추가하면
																	// 배열에 저장됨
                   		dataType: "json"
                   	});
             		
             		
             		$.ajax({
           		    url: "/schedule_change",
           		    type: "post",
           		    dataType: "json", // 이 부분을 수정하지 마십시오
           		    traditional: true,
           		    data: {
           		        "arrStr": travel_memo_array,
           		        "location_UUID": $('#location_uuid').val(),
           		        "schedule_UUID": $('#location_uuid').val(),
           		        "schedule_ID": itemList_copy[0],
           		        "location_ID": travel_memo_array[0],
           		        "schdule_itemList": itemList_copy,
           		    },
   		    	    error: function (xhr, status, error) {
   		    	        console.error("GET 요청 오류: " + error);
   		    	    },
           		});
             		
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy3[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy3,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy4[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy4,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy5[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy5,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy6[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy6,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy7[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy7,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             	}
    	 	}
        }
	 });
   	
   	
   	$.ajax({
        type: "post",
        // url : "/member/memberIdChk", 이건 경로를 설정하는 거니까 뒤에있는 IdChk 메소드가 어느 위치에
		// 있는 어떤 파일인지를 보고 작성할 것
        url: "/modifyChk5",
        data: data,
        success: function (result) {
            // result = 0이면 , success, 새로저장
    	 	if (result == 'schedule_true_modify5') {
        	// POST 요청으로 데이터를 전송
    	 	 if (itemList_copy5[0].includes('table-box5')) {
      		$.ajax({
            		url: "/Plan_to_travel_schedule",
            		type: "post",
            		traditional: true,	// ajax 배열 넘기기 옵션!
            		data: {
            			"arrStr": travel_memo_array,
      		        "location_UUID": $('#location_uuid').val(),
      		        "schedule_UUID": $('#location_uuid').val(),
      		        "schedule_ID": itemList_copy5[0],
      		        "location_ID": travel_memo_array[0],
      		        "schdule_itemList": itemList_copy5}, // 일정표를 추가하면 배열에 저장됨
            		dataType: "json"
            	});
      		
      		
      	} else {
      		console.log("안되잖아..");
         }
         } 	
    	 	
    	 	if (result == 'schedule_false_modify5') { 
            	if (itemList_copy5[0].includes('table-box5')) {
             		$.ajax({
                   		url: "/schedule_change",
                   		type: "post",
                   		traditional: true,	// ajax 배열 넘기기 옵션!
                   		data: {
                   			"arrStr": travel_memo_array,
             		        "location_UUID": $('#location_uuid').val(),
             		        "schedule_UUID": $('#location_uuid').val(),
             		        "schedule_ID": itemList_copy2[0],
             		        "location_ID": travel_memo_array[0],
             		        "schdule_itemList": itemList_copy2}, // 일정표를 추가하면
																	// 배열에 저장됨
                   		dataType: "json"
                   	});
             		
             		
             		$.ajax({
           		    url: "/schedule_change",
           		    type: "post",
           		    dataType: "json", // 이 부분을 수정하지 마십시오
           		    traditional: true,
           		    data: {
           		        "arrStr": travel_memo_array,
           		        "location_UUID": $('#location_uuid').val(),
           		        "schedule_UUID": $('#location_uuid').val(),
           		        "schedule_ID": itemList_copy[0],
           		        "location_ID": travel_memo_array[0],
           		        "schdule_itemList": itemList_copy,
           		    },
   		    	    error: function (xhr, status, error) {
   		    	        console.error("GET 요청 오류: " + error);
   		    	    },
           		});
             		
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy3[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy3,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy4[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy4,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy5[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy5,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy6[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy6,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy7[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy7,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             	}
    	 	}
        }
	 });
   	
   	
   	
   	$.ajax({
        type: "post",
        // url : "/member/memberIdChk", 이건 경로를 설정하는 거니까 뒤에있는 IdChk 메소드가 어느 위치에
		// 있는 어떤 파일인지를 보고 작성할 것
        url: "/modifyChk6",
        data: data,
        success: function (result) {
            // result = 0이면 , success, 새로저장
    	 	if (result == 'schedule_true_modify6') {
        	// POST 요청으로 데이터를 전송
    	 	 if (itemList_copy6[0].includes('table-box6')) {
      		$.ajax({
            		url: "/Plan_to_travel_schedule",
            		type: "post",
            		traditional: true,	// ajax 배열 넘기기 옵션!
            		data: {
            			"arrStr": travel_memo_array,
      		        "location_UUID": $('#location_uuid').val(),
      		        "schedule_UUID": $('#location_uuid').val(),
      		        "schedule_ID": itemList_copy6[0],
      		        "location_ID": travel_memo_array[0],
      		        "schdule_itemList": itemList_copy6}, // 일정표를 추가하면 배열에 저장됨
            		dataType: "json"
            	});
      		
      		
      	} else {
      		console.log("안되잖아..");
         }
         } 	
    	 	
    	 	if (result == 'schedule_false_modify6') { 
            	if (itemList_copy6[0].includes('table-box6')) {
             		$.ajax({
                   		url: "/schedule_change",
                   		type: "post",
                   		traditional: true,	// ajax 배열 넘기기 옵션!
                   		data: {
                   			"arrStr": travel_memo_array,
             		        "location_UUID": $('#location_uuid').val(),
             		        "schedule_UUID": $('#location_uuid').val(),
             		        "schedule_ID": itemList_copy2[0],
             		        "location_ID": travel_memo_array[0],
             		        "schdule_itemList": itemList_copy2}, // 일정표를 추가하면
																	// 배열에 저장됨
                   		dataType: "json"
                   	});
             		
             		
             		$.ajax({
           		    url: "/schedule_change",
           		    type: "post",
           		    dataType: "json", // 이 부분을 수정하지 마십시오
           		    traditional: true,
           		    data: {
           		        "arrStr": travel_memo_array,
           		        "location_UUID": $('#location_uuid').val(),
           		        "schedule_UUID": $('#location_uuid').val(),
           		        "schedule_ID": itemList_copy[0],
           		        "location_ID": travel_memo_array[0],
           		        "schdule_itemList": itemList_copy,
           		    },
   		    	    error: function (xhr, status, error) {
   		    	        console.error("GET 요청 오류: " + error);
   		    	    },
           		});
             		
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy3[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy3,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy4[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy4,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy5[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy5,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy6[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy6,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy7[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy7,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             	}
    	 	}
        }
	 });
   	
   	
   	$.ajax({
        type: "post",
        // url : "/member/memberIdChk", 이건 경로를 설정하는 거니까 뒤에있는 IdChk 메소드가 어느 위치에
		// 있는 어떤 파일인지를 보고 작성할 것
        url: "/modifyChk7",
        data: data,
        success: function (result) {
            // result = 0이면 , success, 새로저장
    	 	if (result == 'schedule_true_modify7') {
        	// POST 요청으로 데이터를 전송
    	 	 if (itemList_copy7[0].includes('table-box7')) {
      		$.ajax({
            		url: "/Plan_to_travel_schedule",
            		type: "post",
            		traditional: true,	// ajax 배열 넘기기 옵션!
            		data: {
            			"arrStr": travel_memo_array,
      		        "location_UUID": $('#location_uuid').val(),
      		        "schedule_UUID": $('#location_uuid').val(),
      		        "schedule_ID": itemList_copy7[0],
      		        "location_ID": travel_memo_array[0],
      		        "schdule_itemList": itemList_copy7}, // 일정표를 추가하면 배열에 저장됨
            		dataType: "json"
            	});
      		
      		
      	} else {
      		console.log("안되잖아..");
         }
         } 	
    	 	
    	 	if (result == 'schedule_false_modify7') { 
            	if (itemList_copy7[0].includes('table-box7')) {
             		$.ajax({
                   		url: "/schedule_change",
                   		type: "post",
                   		traditional: true,	// ajax 배열 넘기기 옵션!
                   		data: {
                   			"arrStr": travel_memo_array,
             		        "location_UUID": $('#location_uuid').val(),
             		        "schedule_UUID": $('#location_uuid').val(),
             		        "schedule_ID": itemList_copy2[0],
             		        "location_ID": travel_memo_array[0],
             		        "schdule_itemList": itemList_copy2}, // 일정표를 추가하면
																	// 배열에 저장됨
                   		dataType: "json"
                   	});
             		
             		
             		$.ajax({
           		    url: "/schedule_change",
           		    type: "post",
           		    dataType: "json", // 이 부분을 수정하지 마십시오
           		    traditional: true,
           		    data: {
           		        "arrStr": travel_memo_array,
           		        "location_UUID": $('#location_uuid').val(),
           		        "schedule_UUID": $('#location_uuid').val(),
           		        "schedule_ID": itemList_copy[0],
           		        "location_ID": travel_memo_array[0],
           		        "schdule_itemList": itemList_copy,
           		    },
   		    	    error: function (xhr, status, error) {
   		    	        console.error("GET 요청 오류: " + error);
   		    	    },
           		});
             		
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy3[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy3,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy4[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy4,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy5[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy5,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy6[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy6,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             		
             		$.ajax({
               		    url: "/schedule_change",
               		    type: "post",
               		    dataType: "json", // 이 부분을 수정하지 마십시오
               		    traditional: true,
               		    data: {
               		        "arrStr": travel_memo_array,
               		        "location_UUID": $('#location_uuid').val(),
               		        "schedule_UUID": $('#location_uuid').val(),
               		        "schedule_ID": itemList_copy7[0],
               		        "location_ID": travel_memo_array[0],
               		        "schdule_itemList": itemList_copy7,
               		    },
       		    	    error: function (xhr, status, error) {
       		    	        console.error("GET 요청 오류: " + error);
       		    	    },
               		});
             	}
    	 	}
        }
	 });
    }   
    document.getElementById("modal").style.display="none";
    $('#memo_text').val("");
	});


document.getElementById("modal_close_btn").onclick = function() {
    document.getElementById("modal").style.display="none";
} 