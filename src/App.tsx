import React, { useState } from "react";
import "./App.css";
import {
	HStack,
	VStack,
	Button,
	Text,
	Box,
	Center,
	useColorMode,
	IconButton,
	Grid,
} from "@chakra-ui/react";
import { Cell, DifficultyLevel } from "./types";
import { CellState } from "./enums";
import { generateBoard, getSurroundTiles, getButtonContent } from "./utils";
import { Menu, VictoryModal } from "./components";
import { defaultDifficulty } from "./constants";
import { ReactComponent as ThemeIcon } from "./assets/theme.svg";
import { ReactComponent as MenuIcon } from "./assets/menu.svg";
import { ReactComponent as ReplayIcon } from "./assets/replay.svg";
import { plantMines } from "./utils/plantMines";

let timerId: NodeJS.Timeout;

const App: React.FC = () => {
	const [board, setBoard] = useState<Cell[][]>([]);
	const [showMines, setShowMines] = useState(false);
	const [minesLeft, setMinesLeft] = useState(defaultDifficulty.numberOfMines);
	const [timeElapsed, setTimeElapsed] = useState(0);
	const [gameStarted, setGameStarted] = useState(false);
	const [difficultyLevel, setDifficultyLevel] =
		useState<DifficultyLevel>(defaultDifficulty);
	const [victoryModalOpen, setVictoryModalOpen] = useState(false);
	const [bombsPlanted, setBombsPlanted] = useState(false);

	const startGame = (level: DifficultyLevel) => {
		setShowMines(false);
		setTimeElapsed(0);
		const newBoard = generateBoard(
			level.xSide,
			level.ySide,
			level.numberOfMines,
		);
		setBoard(newBoard);
		setBombsPlanted(false);
		timerId = setInterval(() => {
			setTimeElapsed(prev => ++prev);
		}, 1000);
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
		clearInterval(timerId);
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
			setVictoryModalOpen(true);
			clearInterval(timerId);
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
		if (cell.state === CellState.Available || cell.number) {
			return "white";
		}
		if (cell.number && cell.number === 0) {
			return "#EAEEEE";
		}
		return "";
	};

	const { toggleColorMode } = useColorMode();

	return (
		<>
			{!gameStarted ? (
				<Menu
					setDifficultyLevel={value => {
						setDifficultyLevel(value);
						setGameStarted(true);
						setMinesLeft(value.numberOfMines);
						startGame(value);
					}}
				/>
			) : (
				<Center h="100vh">
					<Box
						bg="#C7D4D4"
						maxW="90vw"
						p="24px 30px"
						position="relative"
						boxShadow="0px 0px 20px #C7D4D4">
						<VStack position="absolute" left="-60px" top="0">
							<IconButton
								aria-label="Menu"
								h="50px"
								w="50px"
								borderRadius="3px"
								onClick={() => {
									setGameStarted(false);
								}}
								background="#C7D4D5">
								<MenuIcon />
							</IconButton>
							<IconButton
								aria-label="Switch theme"
								borderRadius="3px"
								onClick={toggleColorMode}
								h="50px"
								w="50px"
								background="#C7D4D5">
								<ThemeIcon />
							</IconButton>
							{showMines && (
								<IconButton
									aria-label="Replay"
									borderRadius="3px"
									h="50px"
									w="50px"
									background="#C7D4D5"
									onClick={() => {
										setMinesLeft(
											difficultyLevel.numberOfMines,
										);
										startGame(difficultyLevel);
									}}>
									<ReplayIcon />
								</IconButton>
							)}
						</VStack>
						<HStack mb="30px">
							<Center
								bg="white"
								h="50px"
								w="100px"
								borderRadius="2px">
								<Text
									color="#141415"
									fontFamily="Nunito-light"
									fontSize="30px"
									lineHeight="40px">
									{(minesLeft / 100)
										.toFixed(2)
										.replace(".", "")}
								</Text>
							</Center>
							<Center
								bg="#EAEEEE"
								height="50px"
								flex={1}
								borderRadius="2px">
								<Text
									textTransform="uppercase"
									fontSize="25px"
									fontFamily="Nunito-medium"
									lineHeight="34px"
									color="#141415"
									onClick={ev =>
										console.log(
											ev.detail,
											"easter egg event",
										)
									}>
									Minesweeper
								</Text>
							</Center>
							<Center
								bg="white"
								h="50px"
								w="100px"
								borderRadius="2px">
								<Text
									color="#141415"
									fontFamily="Nunito-light"
									fontSize="30px"
									lineHeight="40px">
									{(timeElapsed / 100)
										.toFixed(2)
										.replace(".", "")}
								</Text>
							</Center>
						</HStack>
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
												showMines ? "none" : "all"
											}
											backgroundColor={getCellBg(cell)}
											fontSize="30px"
											color="#3F423E"
											fontWeight={300}
											onClick={() => clickOnCell(cell)}
											onContextMenu={ev => {
												ev.preventDefault();
												flagCell(cell);
											}}
											px="0"
											_focus={{ boxShadow: "none" }}>
											{getButtonContent(cell, showMines)}
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
					setMinesLeft(difficultyLevel.numberOfMines);
					startGame(difficultyLevel);
				}}
				onClose={() => setVictoryModalOpen(false)}
			/>
		</>
	);
};

export default App;
