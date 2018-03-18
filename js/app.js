function colorBlink(selector) {
	$(selector).animate({
			opacity: '3',
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
			},
			queue: true
		}, 600)
		.delay(1000)
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
				colorBlink('h1.main-titulo');
			},
			queue: true
		});
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}


function givejuegoArrays(arrayType, index) {

	var juegoCol1 = $('.col-1').children();
	var juegoCol2 = $('.col-2').children();
	var juegoCol3 = $('.col-3').children();
	var juegoCol4 = $('.col-4').children();
	var juegoCol5 = $('.col-5').children();
	var juegoCol6 = $('.col-6').children();
	var juegoCol7 = $('.col-7').children();

	var juegoColumns = $([juegoCol1, juegoCol2, juegoCol3, juegoCol4,
		juegoCol5, juegoCol6, juegoCol7
	]);

	if (typeof index === 'number') {
		var juegoRow = $([juegoCol1.eq(index), juegoCol2.eq(index), juegoCol3.eq(index),
			juegoCol4.eq(index), juegoCol5.eq(index), juegoCol6.eq(index),
			juegoCol7.eq(index)
		]);
	} else {
		index = '';
	}

	if (arrayType === 'columns') {
		return juegoColumns;
	} else if (arrayType === 'rows' && index !== '') {
		return juegoRow;
	}
}

function juegoRows(index) {
	var juegoRow = givejuegoArrays('rows', index);
	return juegoRow;
}


function juegoColumns(index) {
	var juegoColumn = givejuegoArrays('columns');
	return juegoColumn[index];
}


function columnValidation() {
	for (var j = 0; j < 7; j++) {
		var counter = 0;
		var juegoPosition = [];
		var extrajuegoPosition = [];
		var juegoColumn = juegoColumns(j);
		var comparisonValue = juegoColumn.eq(0);
		var gap = false;
		for (var i = 1; i < juegoColumn.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcjuego = juegoColumn.eq(i).attr('src');

			if (srcComparison != srcjuego) {
				if (juegoPosition.length >= 3) {
					gap = true;
				} else {
					juegoPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						juegoPosition.push(i - 1);
					} else {
						extrajuegoPosition.push(i - 1);
					}
				}
				if (!gap) {
					juegoPosition.push(i);
				} else {
					extrajuegoPosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = juegoColumn.eq(i);
		}
		if (extrajuegoPosition.length > 2) {
			juegoPosition = $.merge(juegoPosition, extrajuegoPosition);
		}
		if (juegoPosition.length <= 2) {
			juegoPosition = [];
		}
		juegoCount = juegoPosition.length;
		if (juegoCount >= 3) {
			deleteColumnjuego(juegoPosition, juegoColumn);
			setScore(juegoCount);
		}
	}
}
function deleteColumnjuego(juegoPosition, juegoColumn) {
	for (var i = 0; i < juegoPosition.length; i++) {
		juegoColumn.eq(juegoPosition[i]).addClass('delete');
	}
}

function rowValidation() {
	for (var j = 0; j < 6; j++) {
		var counter = 0;
		var juegoPosition = [];
		var extrajuegoPosition = [];
		var juegoRow = juegoRows(j);
		var comparisonValue = juegoRow[0];
		var gap = false;
		for (var i = 1; i < juegoRow.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcjuego = juegoRow[i].attr('src');

			if (srcComparison != srcjuego) {
				if (juegoPosition.length >= 3) {
					gap = true;
				} else {
					juegoPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						juegoPosition.push(i - 1);
					} else {
						extrajuegoPosition.push(i - 1);
					}
				}
				if (!gap) {
					juegoPosition.push(i);
				} else {
					extrajuegoPosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = juegoRow[i];
		}
		if (extrajuegoPosition.length > 2) {
			juegoPosition = $.merge(juegoPosition, extrajuegoPosition);
		}
		if (juegoPosition.length <= 2) {
			juegoPosition = [];
		}
		juegoCount = juegoPosition.length;
		if (juegoCount >= 3) {
			deleteHorizontal(juegoPosition, juegoRow);
			setScore(juegoCount);
		}
	}
}
function deleteHorizontal(juegoPosition, juegoRow) {
	for (var i = 0; i < juegoPosition.length; i++) {
		juegoRow[juegoPosition[i]].addClass('delete');
	}
}


function setScore(juegoCount) {
	var score = Number($('#score-text').text());
	switch (juegoCount) {
		case 3:
			score += 25;
			break;
		case 4:
			score += 50;
			break;
		case 5:
			score += 75;
			break;
		case 6:
			score += 100;
			break;
		case 7:
			score += 200;
	}
	$('#score-text').text(score);
}

function checkBoard() {
	fillBoard();
}

function fillBoard() {
	var top = 6;
	var column = $('[class^="col-"]');

	column.each(function () {
		var juego = $(this).children().length;
		var agrega = top - juego;
		for (var i = 0; i < agrega; i++) {
			var juegoType = getRandomInt(1, 5);
			if (i === 0 && juego < 1) {
				$(this).append('<img src="image/' + juegoType + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + juegoType + '.png" class="element"></img>');
			}
		}
	});
	addjuegoEvents();
	setValidations();
}

function setValidations() {
	columnValidation();
	rowValidation();
	if ($('img.delete').length !== 0) {
		deletesjuegoAnimation();
	}
}


function addjuegoEvents() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: constrainjuegoMovement
	});
	$('img').droppable({
		drop: swapjuego
	});
	enablejuegoEvents();
}

function disablejuegoEvents() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function enablejuegoEvents() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}
function constrainjuegoMovement(event, juegoDrag) {
	juegoDrag.position.top = Math.min(100, juegoDrag.position.top);
	juegoDrag.position.bottom = Math.min(100, juegoDrag.position.bottom);
	juegoDrag.position.left = Math.min(100, juegoDrag.position.left);
	juegoDrag.position.right = Math.min(100, juegoDrag.position.right);
}


function swapjuego(event, juegoDrag) {
	var juegoDrag = $(juegoDrag.draggable);
	var dragSrc = juegoDrag.attr('src');
	var juegoDrop = $(this);
	var dropSrc = juegoDrop.attr('src');
	juegoDrag.attr('src', dropSrc);
	juegoDrop.attr('src', dragSrc);

	setTimeout(function () {
		checkBoard();
		if ($('img.delete').length === 0) {
			juegoDrag.attr('src', dragSrc);
			juegoDrop.attr('src', dropSrc);
		} else {
			updateMoves();
		}
	}, 500);

}

function checkBoardPromise(result) {
	if (result) {
		checkBoard();
	}
}

function updateMoves() {
	var actualValue = Number($('#movimientos-text').text());
	var result = actualValue += 1;
	$('#movimientos-text').text(result);
}


function deletesjuegoAnimation() {
	disablejuegoEvents();
	$('img.delete').effect('pulsate', 400);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				deletesjuego()
					.then(checkBoardPromise)
					.catch(showPromiseError);
			},
			queue: true
		});
}


function showPromiseError(error) {
	console.log(error);
}

function deletesjuego() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar juego...');
		}
	})
}


function endGame() {
	$('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('¡Felicitaciones!');
	$('div.score, div.moves, div.panel-score').width('100%');
	
}


function initGame() {

	colorBlink('h1.main-titulo');

	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		checkBoard();
		$(this).text('Reiniciar');
		$('#timer').startTimer({
			onComplete: endGame
		})
	});
}


$(function() {
	initGame();
});

