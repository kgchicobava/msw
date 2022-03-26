import React, { useState } from "react";
import "./App.css";
import { Button, Box, Center, Grid } from "@chakra-ui/react";
import { Cell, DifficultyLevel } from "./types/types";
import { CellState } from "./constants/enums";
import { generateBoard, getSurroundTiles, getButtonContent } from "./utils";
import { MainMenu, QuickMenu, Stats } from "./components";
import { VictoryModal } from "./modals";
import { defaultDifficulty } from "./constants/constants";
import { plantMines } from "./utils/plantMines";
import { useColor } from "./utils";

const App: React.FC = () => {
	const [board, setBoard] = useState<Cell[][]>([]);
	const [showMines, setShowMines] = useState(false);
	const [minesLeft, setMinesLeft] = useState(defaultDifficulty.numberOfMines);
	const [gameStartedAt, setGameStartedAt] = useState(0);
	const [gameStarted, setGameStarted] = useState(false);
	const [difficultyLevel, setDifficultyLevel] =
		useState<DifficultyLevel>(defaultDifficulty);
	const [victoryModalOpen, setVictoryModalOpen] = useState(false);
	const [bombsPlanted, setBombsPlanted] = useState(false);
	const [victory, setVictory] = useState(false);

	const colors = useColor();

	const startGame = (level: DifficultyLevel) => {
		setShowMines(false);
		const newBoard = generateBoard(level.xSide, level.ySide);
		setBoard(newBoard);
		setBombsPlanted(false);
		setVictory(false);
		setGameStartedAt(new Date().getTime());
	};

	const plantBombs = (cell: Cell) => {
		const mines = plantMines(
			difficultyLevel.numberOfMines,
			difficultyLevel.xSide,
			difficultyLevel.ySide,
			cell,
		);
		const copyBoard = [...board];
		mines.forEach(
			elem =>
				(copyBoard[elem.x][elem.y] = {
					...copyBoard[elem.x][elem.y],
					isMine: true,
				}),
		);
		setBoard(copyBoard);
		setBombsPlanted(true);
	};

	const revealCell = (cell: Cell) => {
		if (cell.state !== CellState.Available || cell.isMine) {
			return;
		}

		const surroundTiles = getSurroundTiles(cell, board);

		const mineCount = surroundTiles.filter(elem => elem.isMine);

		const copyBoard = [...board];
		copyBoard[cell.x][cell.y] = {
			...copyBoard[cell.x][cell.y],
			state: CellState.Number,
			number: mineCount.length,
		};
		setBoard(copyBoard);

		if (mineCount.length === 0) {
			surroundTiles.forEach(revealCell);
		}
	};

	const revealMines = () => {
		setShowMines(true);
		setGameStartedAt(0);
	};

	const checkWin = () => {
		const win = board.every(row =>
			row.every(
				boardCell =>
					boardCell.state === CellState.Number ||
					(boardCell.isMine &&
						(boardCell.state === CellState.Flagged ||
							boardCell.state === CellState.Available)),
			),
		);
		if (win) {
			setVictory(true);
			setVictoryModalOpen(true);
			setGameStartedAt(0);
		}
	};

	const clickOnCell = (cell: Cell) => {
		if (showMines) {
			return;
		}
		if (cell.state === CellState.Available) {
			if (bombsPlanted) {
				revealCell(cell);
				checkWin();
			} else {
				plantBombs(cell);
				revealCell(cell);
			}
		}
		if (cell.isMine) {
			revealMines();
		}
	};

	const flagCell = (cell: Cell) => {
		if (showMines) {
			return;
		}
		if (cell.state === CellState.Flagged) {
			const copyBoard = [...board];
			copyBoard[cell.x][cell.y] = {
				...copyBoard[cell.x][cell.y],
				state: CellState.Available,
			};
			setMinesLeft(prev => ++prev);
			setBoard(copyBoard);
		}
		if (cell.state === CellState.Available) {
			const copyBoard = [...board];
			copyBoard[cell.x][cell.y].state = CellState.Flagged;
			setMinesLeft(prev => --prev);
			setBoard(copyBoard);
		}
	};

	const getCellBg = (cell: Cell) => {
		if (showMines && cell.isMine) {
			return "#FF6060";
		}
		if (
			cell.state === CellState.Available ||
			cell.state === CellState.Flagged ||
			cell.number
		) {
			return colors.availableCell;
		}

		return colors.emptyCell;
	};

	const onReplay = () => {
		setMinesLeft(difficultyLevel.numberOfMines);
		startGame(difficultyLevel);
	};

	return (
		<>
			{!gameStarted ? (
				<MainMenu
					setDifficultyLevel={value => {
						setDifficultyLevel(value);
						setGameStarted(true);
						setMinesLeft(value.numberOfMines);
						startGame(value);
					}}
				/>
			) : (
				<Center h="100vh" bg={colors.background}>
					<Box
						bg={colors.primary}
						maxW="90vw"
						borderRadius="3px"
						p="24px 30px"
						position="relative"
						boxShadow={`0px 0px 20px ${colors.primary}`}>
						<QuickMenu
							onReplay={onReplay}
							setGameStarted={setGameStarted}
						/>
						<Stats
							minesLeft={minesLeft}
							gameStartedAt={gameStartedAt}
						/>
						<Grid
							templateColumns={`repeat(${difficultyLevel.ySide}, auto)`}
							templateRows={`repeat(${difficultyLevel.xSide}, auto)`}
							gap="3px"
							maxH="80vh">
							{board.map((row, index) => (
								<React.Fragment key={index}>
									{row.map((cell, index) => (
										<Button
											minW="auto"
											height={`calc((80vh / ${difficultyLevel.xSide}) - 6px)`}
											width={`calc((80vh / ${difficultyLevel.xSide}) - 6px)`}
											borderRadius="2px"
											fontFamily="Nunito-medium"
											key={index}
											pointerEvents={
												showMines || victory
													? "none"
													: "all"
											}
											transition="all 0s"
											backgroundColor={getCellBg(cell)}
											fontSize={`calc((80vh / ${
												difficultyLevel.xSide + 4
											}))`}
											color="#3F423E"
											fontWeight={300}
											onClick={() => clickOnCell(cell)}
											onContextMenu={ev => {
												ev.preventDefault();
												flagCell(cell);
											}}
											px="0"
											p="10%"
											_focus={{ boxShadow: "none" }}>
											{getButtonContent(
												cell,
												showMines,
												victory,
											)}
										</Button>
									))}
								</React.Fragment>
							))}
						</Grid>
					</Box>
				</Center>
			)}
			<VictoryModal
				isOpen={victoryModalOpen}
				onMenu={() => {
					setVictoryModalOpen(false);
					setGameStarted(false);
				}}
				onRepeat={() => {
					setVictoryModalOpen(false);
					onReplay();
				}}
				onClose={() => setVictoryModalOpen(false)}
			/>
		</>
	);
};

export default App;
