BALLS_INITIAL_POSITION = {
	".ball5": "90px",
	".ball4": "235px",
	".ball3": "265px",
	".ball2": "295px",
	".ball1": "325px"
};

BALLS_SECOND_POSITION = {
	".ball4": "300px",
	".ball3": "330px",
	".ball2": "360px",
	".ball1": "390px"
};



$(document).ready(function () {
	var idStr = "";
	var numId = "";
	var imgId = "";

	var baseBottomValue = "";
	var newBottomValue = "";
	var number = 0;

	var expressionArray = [];
	var expression = "";

	function move() {

		if (numId == 5) {
			if ($(imgId).css("bottom") === "90px") {
				$(imgId).animate({ "bottom": "56px" }, 200);
				number += parseInt(numId) * Math.pow(10, idStr[3]);
			} else {
				$(imgId).animate({ "bottom": "90px" }, 200);
				number -= parseInt(numId) * Math.pow(10, idStr[3]);
			}
		}



		if ($(imgId).css("bottom") !== newBottomValue) {
			for (var i = numId; i < 5; i++) {

				imgId = "#" + idStr.slice(0, idStr.length - 1) + i;
				baseBottomValue = BALLS_INITIAL_POSITION[".ball" + i];
				newBottomValue = BALLS_SECOND_POSITION[".ball" + i];

				if ($(imgId).css("bottom") !== newBottomValue) {
					$(imgId).animate({ "bottom": newBottomValue }, 200);
					number += Math.pow(10, idStr[3]);
				}
			}
		} else {
			for (var i = numId; i > 0; i--) {

				imgId = "#" + idStr.slice(0, idStr.length - 1) + i;
				baseBottomValue = BALLS_INITIAL_POSITION[".ball" + i];

				if ($(imgId).css("bottom") !== baseBottomValue) {
					$(imgId).animate({ "bottom": baseBottomValue }, 200);
					number -= Math.pow(10, idStr[3]);
				}
			}
		}
	}

	function printNumber() {
		$("#number").text(expression + number);
		console.log(expression + number);
	}

	function clean() {
		for (var i = 0; i < 11; i++) {
			for (var j = 0; j < 6; j++) {
				imgId = "#col" + i + "-" + j;
				$(imgId).css("bottom", BALLS_INITIAL_POSITION[".ball" + j]);
			}
		}
		number = 0;
	}

	function expressionJoin() {
		expression = expressionArray.join("");
	}

	function resultPosition(result) {
		if (parseInt(result) > 0 && result.length < 10) {
			result = result.split("").reverse().join("");

			for (var i = 0; i < result.length; i++) {
				var counter = 0;
				if (parseInt(result[i]) > 4) {
					counter += 5;
					imgId = "#col" + i + "-5";
					$(imgId).css("bottom", "56px");
				}
				for (var j = 4; j > 0; j--) {
					if (counter < parseInt(result[i])) {
						imgId = "#col" + i + "-" + j;
						$(imgId).animate({ "bottom": BALLS_SECOND_POSITION[".ball" + j] }, 200);
						counter += 1;
					}
				}
			}
		};
		$('#framework img').off("click");
		$('#framework img').css("cursor", "default");
		$('#operators .sing').css("cursor", "default");

	}

	function operation() {
		switch (idStr) {
			case "clean":
				$('#framework img').css("cursor", "pointer");
				$('#operators .sing').css("cursor", "pointer");
				$('#framework img').on({
					'click': function () {
						idStr = this.id;
						numId = idStr.slice(-1);
						imgId = "#" + idStr;

						baseBottomValue = BALLS_INITIAL_POSITION[".ball" + numId];
						newBottomValue = BALLS_SECOND_POSITION[".ball" + numId];

						move();
						printNumber();
					}
				});
				clean();
				expression = "";
				expressionArray = [];
				$("#number").text("0");
				break;
			case "add":
				expressionArray.push(number + "+");
				expressionJoin();
				clean();
				$("#number").text(expression);
				break;
			case "extract":
				expressionArray.push(number + "-");
				expressionJoin();
				clean();
				$("#number").text(expression);
				break;
			case "multiply":
				expressionArray.push(number + "*");
				expressionJoin();
				clean();
				$("#number").text(expression);
				break;
			case "divide":
				expressionArray.push(number + "/");
				expressionJoin();
				clean();
				$("#number").text(expression);
				break;
			case "result":
				var result = 0;
				if (number == 0) {
					result = eval(expression.slice(0, -1))
					$("#number").text(result);
				} else {
					result = eval(eval(expression + number))
					$("#number").text(result);
				}
				clean();
				expression = "";
				expressionArray = [];
				resultPosition(result.toString());
				break;
		}
	}

	$('#framework img').on({
		'click': function () {
			idStr = this.id;
			numId = idStr.slice(-1);
			imgId = "#" + idStr;

			baseBottomValue = BALLS_INITIAL_POSITION[".ball" + numId];
			newBottomValue = BALLS_SECOND_POSITION[".ball" + numId];

			move();
			printNumber();
		}
	});





	$('#operators img').on({
		'click': function () {
			idStr = this.id;

			operation();


			if (expression.length > 23) {
				$("#number").text("THAT IS A REALLY BIG EXPRESSION");
				clean();
				expression = "";
				expressionArray = [];
			}
		}
	});

})