import { randomNumber } from "./randomNumber";
import { Point } from "../types";

export const plantMines = (
	numberOfMines: number,
	x: number,
	y: number,
): Point[] => {
	const mines: Point[] = [];
	while (mines.length < numberOfMines) {
		const mine = {
			x: randomNumber(x),
			y: randomNumber(y),
		};
		if (!mines.some(elem => elem.x === mine.x && elem.y === mine.y)) {
			mines.push(mine);
		}
	}
	return mines;
};
