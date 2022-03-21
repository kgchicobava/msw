import { Cell } from "../types/types";

export const getSurroundTiles = (cell: Cell, board: Cell[][]) => {
	const surroundTiles = [];
	for (let xOffset = -1; xOffset <= 1; xOffset++) {
		for (let yOffset = -1; yOffset <= 1; yOffset++) {
			const tile = board[cell.x + xOffset]?.[cell.y + yOffset];
			if (tile) {
				surroundTiles.push(tile);
			}
		}
	}
	return surroundTiles;
};
