$(document).ready(function(e) {
	
	$(".groupOfButton button").on('click', function(e){
		var id = $(this).attr('id');
		if(id == 'deleteSingleChar'){
			$('#txtCal').text($('#txtCal').text().substring(0, $('#txtCal').text().length - 1));
		}
		else if(id == 'deleteAll'){
			$('#txtCal').text('');
		}
		else if(id == '='){
			var result = calculateExpression(convertToPostfix($('#txtCal').text()));
			if(result == null) {
				$('#txtCal').text('Invalid Expression!');
			}
			else {
				$('#txtCal').text(result);
			}
		}
		else{
			$('#txtCal').text($('#txtCal').text() + id);
		}
	});
	
});

function getPriority(s) {
	if(s == "+" || s == "-")
		return 1;
	return 2;
}

function isOperator(s) {
	if(s == "+" || s == "-" || s == "*" || s == "/")
		return 1;
	return 0;
}

function convertToPostfix(exp) {
	var stack = [];
	var output = [];
	var number = "";
	for(var i = 0; i < exp.length; i++) {
		if(exp.charAt(i) == "("){
			stack.push("(");
		}
		else if(exp.charAt(i) == ")"){
			if(number.length > 0){
				output.push(number);
				number = "";
			}
			var s = "";
			while(stack.length > 0 && (s = stack.pop()) != "("){
				output.push(s);
			}
		}
		else if(isOperator(exp.charAt(i)) == 1) {
			if(number.length > 0) {
				output.push(number);
				number = "";
			}
			if(stack.length > 0){
				while(stack.length > 0 && isOperator(stack[stack.length-1]) == 1 && getPriority(stack[stack.length-1]) >= getPriority(exp.charAt(i))) {
					output.push(stack.pop());
				}
				stack.push(exp.charAt(i));
			}
			else{
				stack.push(exp.charAt(i));
			}
		}
		else{
			number += exp.charAt(i);
		}
	}
	if(number.length > 0){
		output.push(number);
	}
	while(stack.length > 0) {
		output.push(stack.pop());
	}
	return output;
}

function calculateExpression(input) {
	try {
		var stack = [];
		for(var i = 0; i < input.length; i++){
			if(isOperator(input[i]) == 0) {
				stack.push(parseInt(input[i]));
			}
			else{
				var b = stack.pop();
				var a = stack.pop();
				if(input[i] == "+")
					stack.push(a + b);
				else if(input[i] == "-")
					stack.push(a - b);
				else if(input[i] == "*")
					stack.push(a * b);
				else if(input[i] == "/")
					stack.push((a * 1.0) / b);
			}
		}
		return stack.pop();
	} catch(err){
		return null;
	}
}


