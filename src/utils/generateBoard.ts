import { Cell } from "../types";
import { plantMines } from "./plantMines";
import { CellState } from "../enums";

export const generateBoard = (
	x: number,
	y: number,
	numberOfMines: number,
): Cell[][] => {
	const board: Cell[][] = [];
	// const mines = plantMines(numberOfMines, x, y);
	for (let i = 0; i < x; i++) {
		const row = [];
		for (let j = 0; j < y; j++) {
			row.push({
				// isMine: mines.some(elem => elem.x === i && elem.y === j),
				isMine: false,
				state: CellState.Available,
				x: i,
				y: j,
				number: null,
			});
		}
		board.push(row);
	}

	return board;
};
