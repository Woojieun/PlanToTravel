document.getElementById('map_div_car').style.display = 'none';
document.getElementById('map_div_ped').style.display = 'none';

var date1 = document.getElementsByClassName('date1');
var travel_array = [];
var travel_array2 = [];
var travel_memo_array = [];
var itemList_copy, itemList_copy2;

 
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
	console.log("1");
	// 이 부분에서 "/getHistory" 엔드 포인트로 GET 요청을 보내도록 설정
	$.ajax({
		type : 'GET',
		url : '/getHistory',
		success:function(data) {
			console.log(data + '데이터');
			$('#Offcanvas_History').offcanvas('show');
			},
			error : function () {
			//요청이 실패하면 실행되는 코드
			console.error('요청 실패');
		}
	});
	console.log("2");
});
		

$(document).ready(function () {
    // "스케줄 History" 버튼 클릭 이벤트 처리
    $("#History").click(function () {
        // AJAX를 사용하여 스케줄 히스토리 데이터를 가져옵니다.
        $.get("/scheduleHistory", function (data) {
            // 콘솔에 데이터 출력
            console.log(data);

            // 받은 데이터로 offcanvas에 스케줄 히스토리를 표시합니다.
            $("#Offcanvas_History .offcanvas-body").html(data);
            $("#Offcanvas_History").offcanvas('show'); // offcanvas를 보이게 합니다.
                });
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
          }
	  });
	  // 해당 클래스 하위의 텍스트 드래그를 막는다.
	  $(".column .card").disableSelection();
	});

// 일정표를 이동하면 배열에 저장됨
function saveSortableOrder() {
	  const items = $(".table-box1 [id^=title]");
	  const items2 = $(".table-box2 [id^=title]");
	  const itemList = [];
	  const itemList2 = [];

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

	console.log("출력",itemList); // 배열 업데이트 확인을 위해 콘솔에 출력
	console.log("출력2",itemList2); // 배열 업데이트 확인을 위해 콘솔에 출력
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
          }
            a += 1;	
        }
        
        $("#dateRangeOutput").html(dateRangeOutput);
        $("#travel_table").html(travel_table);
        
          saveSortableOrder(); // 일정표를 추가하면 배열에 저장됨
 /*         saveSortableOrder2();*/

    } else {
        $("#dateRangeOutput").html("올바른 날짜 범위를 선택해주세요.");
        $("#travel_table").html("");
    }
});


// 삭제 라벨
$(document).on('click', ".deleteBox", function () {
  $(this).parent().parent().remove();
/*  saveSortableOrder(); // 일정표를 삭제하면 배열에 저장됨
*/});

var box_title_index = 2;
var box_title_index2 = 2;

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


// 첫째 날 일정 클릭
$(document).on('click', "[id^=title1_]", function () { 

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
	        console.log("GET tlqkf 성공", data2);
	        
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

// 둘째 날 일정 클릭
$(document).on('click', "[id^=title2_]", function () { 

	$(".card-title2").focus();
	
	// 일정표를 클릭하면 메모장 날짜 텍스트 출력
	$('#datepicker').val($("#date2").text());
	
	// 일정표와 메모장의 연결을 위함, 메모장의 제목 텍스트의 아이디 값에 클릭한 일정의 아이디 값 연결함.
	document.querySelector('#memo_text_id').setAttribute("value",$(this).attr('id'));

	
	console.log("출력",itemList2); // 배열 업데이트 확인을 위해 콘솔에 출력
	
	travel_array2.push("title"+a);
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
        	
        	// 메모 배열 출력 (forEach)
        	travel_memo_array.forEach(element => {
        		console.log('저장된 메모 배열',element);
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

      	console.log("출력 첫째날 배열",itemList_copy); // 배열 업데이트 확인을 위해 콘솔에 출력
      
        }
    });
    

    
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
        	
        	// 메모 배열 출력 (forEach)
        	travel_memo_array.forEach(element => {
        		console.log('저장된 메모 배열',element);
        	});
        	
        	// 일정표 배열 출력 (forEach)
        	const items2 = $(".table-box2 [id^=title]");
      	  const itemList2 = [];
      	  var fixedSize2 = 26;

      	  // 일정의 아이디와 텍스트를 배열 저장
      	  // 일정의 아이디는 메모장 배열과 연관이 있기때문이다.
      	itemList2.push($("#travel_title").val());
      	
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
          
          console.log("출력 둘째날 배열",itemList_copy2); // 배열 업데이트 확인을 위해 콘솔에 출력

			}
        });
    
    
    
  //아이디 중복검사
    // #location_uuid에 입력되는 값
    var location_uuid = $('#location_uuid').val();

    if (location_uuid != "") {

        $('.final_id_ck').css('display', 'none');

        var data = {
            location_UUID: location_uuid,
            location_ID : travel_memo_array[0],
            schedule_UUID: location_uuid,
            schedule_ID: itemList_copy[0]
        }

        $.ajax({
            type: "post",
            //url : "/member/memberIdChk", 이건 경로를 설정하는 거니까 뒤에있는 IdChk 메소드가 어느 위치에 있는 어떤 파일인지를 보고 작성할 것
            url: "/IdChk",
            data: data,
            success: function (result) {
            	console.log("true냐 false냐 시발" + result);
                //result = 0이면 , success, 새로저장
                if (result != 'fail' && result != 'successfail') {
                    // uuid 중복이 없는 경우
                	if(travel_memo_array[0].includes('title1')){
                	// 중복 데이터가 없으면 저장
                		// POST 요청으로 데이터를 전송
                		$.ajax({
                		    url: "/Plan_to_travel",
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
                		    },success: function (data2) {
                		    	
                		    	
        		    	        
        		    	    },
        		    	    error: function (xhr, status, error) {
        		    	        console.error("GET 요청 오류: " + error);
        		    	    },
                		});
                    
                	} else if (travel_memo_array[0].includes('title2')) {
                		$.ajax({
                      		url: "/Plan_to_travel",
                      		type: "post",
                      		traditional: true,	// ajax 배열 넘기기 옵션!
                      		data: {
                      			"arrStr" : travel_memo_array,
                      			location_UUID : $('#location_uuid').val(),
                      			schedule_UUID : $('#location_uuid').val(),
                      			"location_ID": travel_memo_array[0],
                      			"schdule_itemList2" : itemList_copy2}, // 일정표를 추가하면 배열에 저장됨
                      		dataType: "json"
                      	});
                	} else {
                		console.log("안되잖아..");
                	}

                }
                if (result == 'fail') {
                	console.log("수정했어..");
                	
                	$.ajax({
                        type: "post",
                        //url : "/member/memberIdChk", 이건 경로를 설정하는 거니까 뒤에있는 IdChk 메소드가 어느 위치에 있는 어떤 파일인지를 보고 작성할 것
                        url: "/modifyChk",
                        data: data,
                        success: function (result) {
                            //result = 0이면 , fail, 데이터 수정
                            if (result != 'fail_modify') {
                    // 수정하기
                	if(travel_memo_array[0].includes('title1')){
                    	$.ajax({
                      		url: "/change",
                      		type: "post",
                      		dataType: "json", // 이 부분을 수정하지 마십시오
                      		traditional: true,	// ajax 배열 넘기기 옵션!
                      		data: {"arrStr" : travel_memo_array,
                      			location_UUID : $('#location_uuid').val(),
                      			location_ID : travel_memo_array[0],
                      			schedule_UUID: location_uuid,
                                schedule_ID: itemList_copy[0],
                      			"schdule_itemList" : itemList_copy}, // 일정표를 추가하면 배열에 저장됨
                      			success: function (data2) {
                    		    	// DB에 정상적으로 수정되었다면, DB에 location_UUID와 location_ID 확인된다면 출력!
                            		$.ajax({
                            		    url: "/location_print",
                            		    type: "post",
                            		    dataType: "json", // 이 부분을 수정하지 마십시오
                            		    traditional: true,
                            		    data: {
                            		    	"arrStr" : travel_memo_array,
                                  			location_UUID : $('#location_uuid').val(),
                                  			location_ID : travel_memo_array[0],
                                  			schedule_UUID: location_uuid,
                                            schedule_ID: itemList_copy[0],
                                  			"schdule_itemList" : itemList_copy
                            		    },success: function (data2) {
                    		    	        // 여기서 data2를 사용하여 원하는 작업을 수행
                    		    	        console.log("GET 수정 성공 확인", data2);
                    		    	        
                    		    	        // data2 객체 내의 배열에서 첫 번째 요소 추출
                    		    	        var firstItem = data2.data2[0];

                    		    	        // 필요한 데이터 추출
                    		    	        var location_TITLE = firstItem.location_TITLE;
                    		    	        var location_DATE = firstItem.location_DATE;
                    		    	        var location_ID = firstItem.location_ID;
                    		    	        // 이하 필요한 데이터 추가
                    		    	        
                    		    	        // HTML 요소에 데이터 출력
                    		    	        $('#Title').text(location_TITLE);
                    		    	        // 다른 필드에 대한 데이터도 출력하십시오.
                    		    	    },
                    		    	    error: function (xhr, status, error) {
                    		    	        console.error("GET 요청 오류: " + error);
                    		    	    }
                            		});
            		    	        
            		    	    },
            		    	    error: function (xhr, status, error) {
            		    	        console.error("GET 요청 오류: " + error);
            		    	    },
                      		dataType: "json"
                      	});
                    	} else if (travel_memo_array[0].includes('title2')) {
                    		$.ajax({
                          		url: "/change",
                          		type: "post",
                          		traditional: true,	// ajax 배열 넘기기 옵션!
                          		data: {"arrStr" : travel_memo_array,
                          			location_UUID : $('#location_uuid').val(),
                          			location_ID : travel_memo_array[0],
                          			"schdule_itemList2" : itemList_copy2}, // 일정표를 추가하면 배열에 저장됨
                          		dataType: "json"
                          	});
                    	} else {
                    		console.log("title2 수정 안되잖아..");
                    	}
                            }
                            else {
                            	console.log("수정 안되잖아..");
                            }
                            
                        } // success 종료

                    }); // ajax 종료
                }
                

                
                else {
                	console.log("schedule 수정 location 삽입을 같이 해야된다고");
                	
                	$.ajax({
                        type: "post",
                        //url : "/member/memberIdChk", 이건 경로를 설정하는 거니까 뒤에있는 IdChk 메소드가 어느 위치에 있는 어떤 파일인지를 보고 작성할 것
                        url: "/modifyChk",
                        data: data,
                        success: function (result) {
                            //result = 0이면 , fail, 데이터 수정
                            if (result == 'successfail_modify') {
                	
                	// location 삽입, 수정
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
            		        "schdule_itemList": itemList_copy
            		    },success: function (data2) {
            		    	// DB에 정상적으로 삽입되었다면, DB에 location_UUID와 location_ID를 확인된다면 출력!
                    		$.ajax({
                    		    url: "/location_print",
                    		    type: "post",
                    		    dataType: "json", // 이 부분을 수정하지 마십시오
                    		    traditional: true,
                    		    data: {
                    		        "location_UUID": $('#location_uuid').val(),
                    		        "location_ID": travel_memo_array[0]
                    		    },success: function (data2) {
            		    	        // 여기서 data2를 사용하여 원하는 작업을 수행
            		    	        console.log("GET tlqkf 성공", data2);
            		    	        
            		    	        // data2 객체 내의 배열에서 첫 번째 요소 추출
            		    	        var firstItem = data2.data2[0];

            		    	        // 필요한 데이터 추출
            		    	        var location_TITLE = firstItem.location_TITLE;
            		    	        var location_DATE = firstItem.location_DATE;
            		    	        var location_ID = firstItem.location_ID;
            		    	        // 이하 필요한 데이터 추가
            		    	        
            		    	        // HTML 요소에 데이터 출력
            		    	        $('#Title').text(location_TITLE);
            		    	        // 다른 필드에 대한 데이터도 출력하십시오.
            		    	    },
            		    	    error: function (xhr, status, error) {
            		    	        console.error("GET 요청 오류: " + error);
            		    	    }
                    		});
    		    	        
    		    	    },
    		    	    error: function (xhr, status, error) {
    		    	        console.error("GET 요청 오류: " + error);
    		    	    },
            		});
                	
                            }
                            else {
                            	console.log("수정 안되잖아..");
                            }
                            
                        } // success 종료

                    }); // ajax 종료
                	
              }
                
                
                
            } // success 종료
        
        

        }); // ajax 종료

        
        
        
        
    }    
    document.getElementById("modal").style.display="none";
    $('#memo_text').val("");
	});


document.getElementById("modal_close_btn").onclick = function() {
    document.getElementById("modal").style.display="none";
} 