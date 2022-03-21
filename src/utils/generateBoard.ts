import { Cell } from "../types/types";
import { CellState } from "../constants/enums";

export const generateBoard = (x: number, y: number): Cell[][] =>
	Array.from({ length: x }, (_, idy) =>
		Array.from({ length: y }, (_, idx) => ({
			isMine: false,
			state: CellState.Available,
			x: idy,
			y: idx,
			number: null,
		})),
	);
