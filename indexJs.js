//===== javaScript for actions =====//

//=== apply height to fit for all screen size ===//
var box = document.getElementsByClassName('empContainer')[0];
var height = (window.innerHeight - 50);
box.style.height=(height)+'px';
var tempData = [];
var selectedRow = null;
//=== End ===//


function onFormSubmit(e){
    event.preventDefault();
    var formData = readFormData();
	tempData.push(formData);
        //insertNewRecord(formData);
		//insertNameSalary(formData)
		resetForm()
	if(selectedRow === null){
		insertNameSalary(formData);
		console.log(tempData);
    }else{
        updateRecord(formData)
    }
	
    //resetForm();
}
//console.log(tempData);
// Read operation using this function
function readFormData(){
	var empData = {};
	var increment = 010;
	var date = new Date(document.getElementById("joinDate").value);
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	//alert([month, day, year].join('/'));
    empData["empId"] = (Math.floor(Math.random()*increment)+1) + document.getElementById("empName").value;
    empData["empName"] = document.getElementById("empName").value;
    empData["deptValue"] = document.getElementById("dept").value;
    empData["dept"] = document.getElementById("dept").options[document.getElementById("dept").selectedIndex].text;
    empData["joinDate"] = [month, day, year].join('/')
    empData["annCtc"] = document.getElementById("annCtc").value;
	return empData;
}

function insertNameSalary(data){
    var emptable = document.getElementById("empMonthSalList").getElementsByTagName('tbody')[0];
	var tabRows = document.getElementById("empMonthSalList").rows;
    var newRow = emptable.insertRow(emptable.length);
	newRow.setAttribute('empId', ''+ data.empId +'');
	var sumTotal = [];
	
    var cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.empName;
		//var getId =  data.empName + data.deptValue;
		//cell1.setAttribute('labelText', ''+ getId +'' );
    var cell2 = newRow.insertCell(1);
        cell2.innerHTML = (data.annCtc/12).toFixed(2);
		if (emptable != null) {
        for (var i = 0; i < emptable.rows.length; i++) {
            getTotalMonthSal = parseFloat(emptable.rows[i].cells[1].innerText);
				sumTotal.push(getTotalMonthSal);
				var getTotalMonthSal = 0;
				for (let i = 0; i < sumTotal.length; i++) {
					getTotalMonthSal += sumTotal[i];
				}
				//console.log(getTotalMonthSal)
				document.getElementById("totlEmpSal").innerHTML = getTotalMonthSal.toFixed(2);
        }
    }
		addRowHandlers(tempData);
		
}
function addRowHandlers(data) {
    var table = document.getElementById("empMonthSalList");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler = 
            function(row) 
            {
                return function() { 
				var class_name='highlight';
				elements=document.getElementsByClassName(class_name);
				for(element of elements){
				  element.classList.remove(class_name)
				}
					var getRowId = row.getAttribute('empId');
					row.classList.add("highlight");
					var selectedData = data[data.map(function (item) { return item.empId; }).indexOf(getRowId)];
					dispayEmpDetails(selectedData);
					document.getElementsByClassName("removeBtn")[0].setAttribute('removeId', ''+ selectedData.empId +'');
				};
            };

        currentRow.onclick = createClickHandler(currentRow);
    }
}
function dispayEmpDetails(displayData) {
  var oneMonBasic = (displayData.annCtc / 12 * 60/100).toFixed(2);
  var oneYearBasic = oneMonBasic * 12;
	document.getElementById("empfullname").innerHTML = "";
	document.getElementById("empDepartment").innerHTML = "";
	document.getElementById("joinnDate").innerHTML = "";
	document.getElementById("monthSal").value = "";
	document.getElementById("annualSal").value = displayData.annCtc ;
	document.getElementById("monthHra").value = "";
	document.getElementById("annualHra").value = "";
	document.getElementById("monthTotal").value = "";
	document.getElementById("annualTotal").value = "";
	document.getElementById("empfullname").innerHTML = displayData.empName; 
	document.getElementById("empDepartment").innerHTML = displayData.dept ;
	document.getElementById("joinnDate").innerHTML = displayData.joinDate ;
	document.getElementById("monthSal").value = oneMonBasic  ;
	document.getElementById("annualSal").value = oneYearBasic;
	document.getElementById("monthHra").value = (displayData.annCtc / 12 * 40/100).toFixed(2);
	document.getElementById("annualHra").value = (displayData.annCtc * 40 / 100).toFixed(2) ;
	document.getElementById("monthTotal").value = parseInt(document.getElementById("monthSal").value) + parseInt(document.getElementById("monthHra").value);
	document.getElementById("annualTotal").value = parseInt(document.getElementById("annualHra").value) + parseInt(document.getElementById("annualSal").value) ;
	
}
//window.onload = addRowHandlers();
function updateRecord(){
	//gets table
	var updtEmpSal = {};
	updtEmpSal["basMonSal"] = parseFloat(document.getElementById("monthSal").value);
	updtEmpSal["basAnnSal"] = parseFloat(document.getElementById("annualSal").value);
	updtEmpSal["hraMonSal"] = parseFloat(document.getElementById("monthHra").value);
	updtEmpSal["hraAnnSal"] = parseFloat(document.getElementById("annualHra").value);
	updtEmpSal["monTotSal"] = parseFloat(document.getElementById("monthTotal").value);
	updtEmpSal["annTotSal"] = parseFloat(document.getElementById("annualTotal").value);
	document.getElementById("annualTotal").value= parseFloat(document.getElementById("annualSal").value) + parseFloat(document.getElementById("annualHra").value);
	document.getElementById("monthTotal").value= parseFloat(document.getElementById("monthSal").value) + parseFloat(document.getElementById("monthHra").value);
	
	var getUpdtId = document.getElementsByClassName("removeBtn")[0].getAttribute("removeId");
	var updtTableRow = document.getElementById("empMonthSalList").rows;
	//var removeSelectedData = data[data.map(function (item) { return item.empId; }).indexOf(getRowId)];
	for (i = 0; i < updtTableRow.length; i++) {
		var getRow = updtTableRow[i].getAttribute("empid");
		var updtSelectedData = tempData[tempData.map(function (item) { return item.empId; }).indexOf(getUpdtId)];
		if(getRow == getUpdtId){
			var oldValue = parseFloat(updtTableRow[i].cells[1].innerText);
			if(updtEmpSal.monTotSal != parseFloat(document.getElementById("monthTotal").value)){
				var totalMontSal = (updtEmpSal.basMonSal + updtEmpSal.hraMonSal) * 12 ;
				document.getElementById("monthSal").value= ((totalMontSal/12) *60/100).toFixed(2);
				document.getElementById("monthHra").value= ((totalMontSal/12) *40/100).toFixed(2);
				document.getElementById("monthTotal").value= parseFloat(document.getElementById("monthSal").value) + parseFloat(document.getElementById("monthHra").value);
				document.getElementById("annualSal").value= (totalMontSal * 60/100).toFixed(2);
				document.getElementById("annualHra").value= (totalMontSal * 40/100).toFixed(2);
				document.getElementById("annualTotal").value= totalMontSal;
				updtTableRow[i].cells[1].innerHTML = parseFloat(document.getElementById("monthSal").value) + parseFloat(document.getElementById("monthHra").value) 
			}else if(updtEmpSal.annTotSal != parseFloat(document.getElementById("annualTotal").value)){
				var totalAnnSal = (updtEmpSal.basAnnSal + updtEmpSal.hraAnnSal) ;
				document.getElementById("annualSal").value= (totalAnnSal * 60/100).toFixed(2);
				document.getElementById("annualHra").value= (totalAnnSal * 40/100).toFixed(2);
				document.getElementById("annualTotal").value= parseFloat(document.getElementById("annualSal").value) + parseFloat(document.getElementById("annualHra").value);
				
				document.getElementById("monthSal").value= ((totalAnnSal/12) *60/100).toFixed(2);
				document.getElementById("monthHra").value= ((totalAnnSal/12) *40/100).toFixed(2);
				document.getElementById("monthTotal").value = (totalAnnSal / 12).toFixed(2);
				updtTableRow[i].cells[1].innerHTML = (totalAnnSal / 12).toFixed(2);
			}
			var objIndex = tempData.findIndex((obj => obj.empId == updtTableRow[i].getAttribute("empid")));
			console.log(objIndex);
			tempData[objIndex].annCtc = document.getElementById("annualTotal").value;
			//updtTableRow[1].value = 120;
		}
	}
}

function resetForm(){
	document.getElementById("empName").value = ""
	document.getElementById("dept").value = "";
    document.getElementById("joinDate").value = "";
    document.getElementById("annCtc").value = "";
	selectedRow = null;
}

function onDelete(){
	var getRemoveId = document.getElementsByClassName("removeBtn")[0].getAttribute("removeId");
	var removeTableRow = document.getElementById("empMonthSalList").rows;
	//var removeSelectedData = data[data.map(function (item) { return item.empId; }).indexOf(getRowId)];
	for (i = 0; i < removeTableRow.length; i++) {
		var getRow = removeTableRow[i].getAttribute("empid");
		var removeSelectedData = tempData[tempData.map(function (item) { return item.empId; }).indexOf(getRemoveId)];
		if(getRow == getRemoveId){
			removeTableRow[i].remove()
		}
	}
	
	
}
