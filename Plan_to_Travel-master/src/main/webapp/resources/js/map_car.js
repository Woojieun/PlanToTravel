
		// 일정 날짜를 클릭하게 되면 DB 데이터를 불러와 다중 경유지를 보여주게 된다.
	 $(document).on('click', "#date1", function () {
	 $.ajax({
         url: '/Schedule_print',
         type: 'post',
         data: {
        	 schedule_UUID: $('#location_uuid').val(),
		     schedule_ID: itemList_copy[0]
         },
         success: function (response) {
             console.log("map_div_ped 실행");

             var new_polyLine = [];
             var new_Click_polyLine = [];

             function drawData(data) {
            	    // 지도위에 선은 다 지우기
            	    routeData = data;
            	    var resultStr = "";
            	    var distance = 0;
            	    var idx = 1;
            	    var newData = [];
            	    var equalData = [];
            	    var pointId1 = "-1234567";
            	    var ar_line = [];

            	    for (var i = 0; i < data.features.length; i++) {
            	        var feature = data.features[i];
            	        // 배열에 경로 좌표 저장
            	        if (feature.geometry.type == "LineString") {
            	            ar_line = [];
            	            for (var j = 0; j < feature.geometry.coordinates.length; j++) {
            	                var startPt = new Tmapv2.LatLng(feature.geometry.coordinates[j][1], feature.geometry.coordinates[j][0]);
            	                ar_line.push(startPt);
            	                pointArray.push(feature.geometry.coordinates[j]);
            	            }
            	            var polyline = new Tmapv2.Polyline({
            	                path: ar_line,
            	                strokeColor: "#ff0000",
            	                strokeWeight: 6, // 폴리라인 두께 설정
            	                map: map_ped
            	            });
            	            new_polyLine.push(polyline);
            	        }
            	        var pointId2 = feature.properties.viaPointId;
            	        if (pointId1 != pointId2) {
            	            equalData = [];
            	            equalData.push(feature);
            	            newData.push(equalData);
            	            pointId1 = pointId2;
            	        } else {
            	            equalData.push(feature);
            	        }
            	    }
            	    geoData = newData;
            	    var markerCnt = 1;
            	    for (var i = 0; i < newData.length; i++) {
            	        var mData = newData[i];
            	        var type = mData[0].geometry.type;
            	        var pointType = mData[0].properties.pointType;
            	        var pointTypeCheck = false; // 경유지 일때만 true
            	        if (mData[0].properties.pointType == "S") {
            	            var img = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png';
            	            var lon = mData[0].geometry.coordinates[0];
            	            var lat = mData[0].geometry.coordinates[1];
            	        } else if (mData[0].properties.pointType == "E") {
            	            var img = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png';
            	            var lon = mData[0].geometry.coordinates[0];
            	            var lat = mData[0].geometry.coordinates[1];
            	        } else {
            	            markerCnt = i;
            	            var lon = mData[0].geometry.coordinates[0];
            	            var lat = mData[0].geometry.coordinates[1];
            	        }
            	    }
            	}
             // 2. 시작, 도착 심볼찍기

             var markerList = [];
             var pointArray = [];
             
             console.log(response[0]);
             var lastIndex_lng = response.length - 2;
             var lastIndex_lat = response.length - 1;
             var lastIndex_ = response.length - 3;
             
             	// 시작
             	addMarker("llStart",response[0],response[1],1);
             	// 도착 
             	addMarker("llEnd",response[lastIndex_lng],response[lastIndex_lat],2);
             	
             	function addMarker(status, lon, lat, tag) {
             	//출도착경유구분
             	//이미지 파일 변경.
             	var markerLayer;
             	switch (status) {
             		case "llStart":
             			imgURL = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png';
             			break;
             		case "llPass":
             			imgURL = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_p.png';
             			break;
             		case "llEnd":
             			imgURL = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png';
             			break;
             		default:
             	};
             	var marker = new Tmapv2.Marker({
             		position: new Tmapv2.LatLng(lat,lon),
             		icon: imgURL,
             		map: map_ped
             	});
             	// 마커 드래그 설정
             	marker.tag = tag;
             	marker.addListener("dragend", function (evt) {
             	markerListenerEvent(evt);
                 });
                 marker.addListener("drag", function (evt) {    	
                 	markerObject = markerList[tag];
                 });
                 markerList[tag] = marker;
             	return marker;
             }

             	var passList = ""; // 경유지 생성 변수

                // 처음 두 개와 마지막 두 개를 제외한 값들만 추출
                if (response.length > 4) {
                    // 패턴 생성
                    for (var i = 2; i < response.length - 2; i += 2) {
                    	addMarker("llPass",response[i],response[i+1],i+1);
                        passList += response[i] + "," + response[i + 1] + "_";
                    }

                    // 마지막에 추가된 밑줄 제거
                    passList = passList.substring(0, passList.length - 1);
                }
             	
             // 4. 경로탐색 API 사용요청
             	var startX = response[0];
             	var startY = response[1];
             	var endX = response[lastIndex_lng];
             	var endY = response[lastIndex_lat];
             	var prtcl;
             	var headers = {};
             	headers["appKey"]="5A53DsGwddaFFyXqIjgmU8VGi3Vsx3Yb8DYy3kT7";
             	$.ajax({
             			method:"POST", 
             			headers : headers, 
             			url:"https://apis.openapi.sk.com/tmap/routes?version=1&format=json",
             			async:false,
             			data:{ 
             				startX : startX,
             				startY : startY,
             				endX : endX,
             				endY : endY,
             				passList : passList,
             				reqCoordType : "WGS84GEO",
             				resCoordType : "WGS84GEO",
             				angle : "172",
             				searchOption : "0",
             				trafficInfo : "Y"
             			},
             			success:function(response){
             			prtcl = response;
             			
             			// 5. 경로탐색 결과 Line 그리기 
             			var trafficColors = {
             				extractStyles:true,
             				/* 실제 교통정보가 표출되면 아래와 같은 Color로 Line이 생성됩니다. */
             				trafficDefaultColor:"#636f63", //Default
             				trafficType1Color:"#19b95f", //원할
             				trafficType2Color:"#f15426", //지체
             				trafficType3Color:"#ff970e"  //정체		
             			};    			
             			var style_red = {
             				fillColor:"#FF0000",
             				fillOpacity:0.2,
             				strokeColor: "#FF0000",
             				strokeWidth: 3,
             				strokeDashstyle: "solid",
             				pointRadius: 2,
             				title: "this is a red line"
             			};
             			drawData(prtcl);
             		// 6. 경로탐색 결과 반경만큼 지도 레벨 조정
            			var newData = geoData[0];
            			PTbounds = new Tmapv2.LatLngBounds();
            					for (var i = 0; i < newData.length; i++) {
            						var mData = newData[i];
            						var type = mData.geometry.type;
            						var pointType = mData.properties.pointType;
            						if(type == "Point"){
            							var linePt = new Tmapv2.LatLng(mData.geometry.coordinates[1],mData.geometry.coordinates[0]);
            							console.log(linePt);
            							PTbounds.extend(linePt);
            						}
            						else{
            							var startPt,endPt;
            							for (var j = 0; j < mData.geometry.coordinates.length; j++) {
            								var linePt = new Tmapv2.LatLng(mData.geometry.coordinates[j][1],mData.geometry.coordinates[j][0]);
            								PTbounds.extend(linePt);
            							}
            					}
            				}
            				map.fitBounds(PTbounds);
            		
             		
             			},
             			error:function(request,status,error){
             			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
             		}
             	});
 },
 error: function (xhr, status, error) {
     console.error("POST 요청 오류: " + error);
 }
});
});