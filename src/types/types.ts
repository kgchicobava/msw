import { CellState, Level } from "../constants/enums";

export type Point = {
	x: number;
	y: number;
};

export interface Cell extends Point {
	isMine: boolean;
	state: CellState;
	number: number | null;
}

export type DifficultyLevel = {
	level: Level;
	name: string;
	xSide: number;
	ySide: number;
	numberOfMines: number;
};
