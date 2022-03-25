import React from "react";
import { ReactComponent as MineIcon } from "../assets/mine.svg";
import { ReactComponent as FlagIcon } from "../assets/flag.svg";
import { Cell } from "../types/types";
import { CellState } from "../constants/enums";

export const getButtonContent = (
	cell: Cell,
	showMines: boolean,
	victory: boolean,
) => {
	if (showMines) {
		if (cell.isMine) {
			return <MineIcon />;
		}
	}

	switch (cell.state) {
		case CellState.Number:
			return cell.number || "";
		case CellState.Flagged:
			return <FlagIcon />;
		case CellState.Available:
			if (victory && cell.isMine) {
				return <MineIcon />;
			} else {
				return null;
			}
		default:
			return null;
	}
};
