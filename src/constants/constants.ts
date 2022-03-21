import { Level } from "./enums";
import { DifficultyLevel } from "../types/types";

export const difficultyLevels: DifficultyLevel[] = [
	{
		level: Level.Easy,
		name: "8×8",
		xSide: 8,
		ySide: 8,
		numberOfMines: 10,
	},
	{
		level: Level.Medium,
		name: "16×16",
		xSide: 16,
		ySide: 16,
		numberOfMines: 20,
	},
	{
		level: Level.Hard,
		name: "21×21",
		xSide: 21,
		ySide: 21,
		numberOfMines: 30,
	},
];

export const defaultDifficulty = {
	level: Level.Easy,
	name: "",
	xSide: 0,
	ySide: 0,
	numberOfMines: 0,
};
