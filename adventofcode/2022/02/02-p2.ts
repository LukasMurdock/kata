// deno run --allow-read 02/02-p2.ts

function sumNumbers(array: number[]) {
	return array.reduce((sum, value) => sum + value, 0);
}

const ROUND_DELIMITER = '\n';
const INSTRUCTION_DELIMITER = ' ';

const OUTCOME = {
	Won: 'Won',
	Lost: 'Lost',
	Draw: 'Draw',
};

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
	[OUTCOME.Lost]: 0,
	[OUTCOME.Draw]: 3,
	[OUTCOME.Won]: 6,
} as const;

const OPPONENT_MOVE = {
	A: MOVESET.Rock,
	B: MOVESET.Paper,
	C: MOVESET.Scissors,
} as const;

// Part two says the second column says how the round needs to end
const REQUIRED_OUTCOME = {
	X: OUTCOME.Lost,
	Y: OUTCOME.Draw,
	Z: OUTCOME.Won,
} as const;

// If both players choose the same shape,
// the round instead ends in a draw.
function playersDraw(opponentMove: string, yourMove: string) {
	return OPPONENT_MOVE[opponentMove] === YOUR_MOVE[yourMove];
}

function calculateWinningMove(move: keyof typeof MOVESET) {
	switch (move) {
		case MOVESET.Paper:
			return MOVESET.Scissors;
		case MOVESET.Rock:
			return MOVESET.Paper;
		case MOVESET.Scissors:
			return MOVESET.Rock;
		default:
			break;
	}
}

function calculateRequiredMove(opponentMove: string, outcome: string) {
	if (OUTCOME[outcome] === OUTCOME.Draw) {
		// If both players choose the same shape,
		// the round instead ends in a draw.
		return OPPONENT_MOVE[opponentMove];
	} else if (OUTCOME[outcome] === OUTCOME.Lost) {
		const winningMove = calculateWinningMove(OPPONENT_MOVE[opponentMove]);
		// Select a non-winning move
		return Object.values(MOVESET).filter((move) => move !== winningMove)[0];
	} else {
		return calculateWinningMove(OPPONENT_MOVE[opponentMove]);
	}
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

async function readStrategyGuide() {
	return await Deno.readTextFile('./02/input.txt');
}

async function getStrategyGuide() {
	const moves = await readMoveFile();
	return moves
		.trim()
		.split(ROUND_DELIMITER)
		.map((round) => round.split(INSTRUCTION_DELIMITER));
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

// 4, 1, 7
// Total score = 12
const TEST_MOVES = [
	['A', 'Y'],
	['B', 'X'],
	['C', 'Z'],
] as [string, string][];

const partOne = sumNumbers(calculateTotalScore(moves));

// console.log(moves);
