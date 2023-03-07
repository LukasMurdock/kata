// deno run --allow-read 02/02-p1.ts

function sumNumbers(array: number[]) {
	return array.reduce((sum, value) => sum + value, 0);
}

const ROUND_DELIMITER = '\n';
const PLAYER_DELIMITER = ' ';

const MOVESET = {
	Rock: 'Rock',
	Paper: 'Paper',
	Scissors: 'Scissors',
} as const;

const MOVESET_SELECTION_SCORE = {
	Rock: 1,
	Paper: 2,
	Scissors: 3,
} as const;

const OUTCOME_SCORE = {
	Lost: 0,
	Draw: 3,
	Won: 6,
} as const;

const OPPONENT_MOVE = {
	A: MOVESET.Rock,
	B: MOVESET.Paper,
	C: MOVESET.Scissors,
} as const;

const YOUR_MOVE = {
	X: MOVESET.Rock,
	Y: MOVESET.Paper,
	Z: MOVESET.Scissors,
} as const;

// If both players choose the same shape,
// the round instead ends in a draw.
function playersDraw(opponentMove: string, yourMove: string) {
	return OPPONENT_MOVE[opponentMove] === YOUR_MOVE[yourMove];
}

// Rock 1 defeats Scissors 3,
// Scissors 3 defeats Paper 2,
// and Paper 2 defeats Rock 1.
function playerWonRound(opponentMove: string, yourMove: string) {
	const rockBeatsScissors =
		OPPONENT_MOVE[opponentMove] === MOVESET.Scissors &&
		YOUR_MOVE[yourMove] === MOVESET.Rock;
	const scissorsBeatsPaper =
		OPPONENT_MOVE[opponentMove] === MOVESET.Paper &&
		YOUR_MOVE[yourMove] === MOVESET.Scissors;
	const paperBeatsRock =
		OPPONENT_MOVE[opponentMove] === MOVESET.Rock &&
		YOUR_MOVE[yourMove] === MOVESET.Paper;
	return rockBeatsScissors || scissorsBeatsPaper || paperBeatsRock;
}

async function readMoveFile() {
	return await Deno.readTextFile('./02/input.txt');
}

async function getMoves() {
	const moves = await readMoveFile();
	return moves
		.trim()
		.split(ROUND_DELIMITER)
		.map((round) => round.split(PLAYER_DELIMITER));
}

// Round score is calculated by `yourShapeSelectionScore + outcomeScore`:
function calculateRoundScore(opponentMove: string, yourMove: string) {
	const moveScore = MOVESET_SELECTION_SCORE[YOUR_MOVE[yourMove]];

	if (playersDraw(opponentMove, yourMove)) {
		return moveScore + OUTCOME_SCORE.Draw;
	} else if (playerWonRound(opponentMove, yourMove)) {
		return moveScore + OUTCOME_SCORE.Won;
	} else {
		return moveScore + OUTCOME_SCORE.Lost;
	}
}

function calculateTotalScore(moves: [string, string][]) {
	return moves.map((round) => calculateRoundScore(round[0], round[1]));
}

const moves = await getMoves();

// 8, 1, 6
// Total score = 15
const TEST_MOVES = [
	['A', 'Y'],
	['B', 'X'],
	['C', 'Z'],
	['B', 'Y'],
] as [string, string][];

const partOne = sumNumbers(calculateTotalScore(moves));

// console.log(moves);
