import React, { useState, useEffect } from "react";
import "./App.css";
import {
	ChakraProvider,
	HStack,
	VStack,
	Button,
	Text,
	Box,
	Center,
	useColorMode,
} from "@chakra-ui/react";
import { Cell, DifficultyLevel } from "./types";
import { CellState } from "./enums";
import { generateBoard, getSurroundTiles, getButtonContent } from "./utils";
import { Menu, VictoryModal } from "./components";
import { defaultDifficulty } from "./constants";
import theme from "./theme";

let timerId: NodeJS.Timeout;

const App: React.FC = () => {
	const [board, setBoard] = useState<Cell[][]>([]);
	const [showMines, setShowMines] = useState(false);
	const [minesLeft, setMinesLeft] = useState(defaultDifficulty.numberOfMines);
	const [timeElapsed, setTimeElapsed] = useState(0);
	const [gameStarted, setGameStarted] = useState(false);
	const [difficultyLevel, setDifficultyLevel] =
		useState<DifficultyLevel>(defaultDifficulty);

	const startGame = () => {
		setShowMines(false);
		setTimeElapsed(0);
		const newBoard = generateBoard(
			difficultyLevel.xSide,
			difficultyLevel.ySide,
			difficultyLevel.numberOfMines,
		);
		setBoard(newBoard);
		timerId = setInterval(() => {
			setTimeElapsed(prev => ++prev);
		}, 1000);
	};

	useEffect(() => {
		if (difficultyLevel.name) {
			setGameStarted(true);
			setMinesLeft(difficultyLevel.numberOfMines);
			startGame();
		}
	}, [difficultyLevel]);

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
	};

	const clickOnCell = (cell: Cell) => {
		if (cell.state === CellState.Available) {
			revealCell(cell);
			checkWin();
		}
		if (cell.isMine) {
			revealMines();
		}
	};

	const flagCell = (cell: Cell) => {
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

	const { toggleColorMode } = useColorMode();

	return (
		<>
			{!gameStarted ? (
				<Menu setDifficultyLevel={setDifficultyLevel} />
			) : (
				<Center h="100vh">
					<Button onClick={toggleColorMode}>Switch</Button>
					<Box
						bg="#C5CBC4"
						w="fit-content"
						p="24px 30px"
						boxShadow="0px 0px 20px #C5CBC4">
						<HStack mb="30px">
							<Center bg="white" h="50px" w="100px">
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
							<Center bg="#E1E7E0" height="50px" flex={1}>
								<Text
									textTransform="uppercase"
									fontSize="25px"
									fontFamily="Nunito-medium"
									lineHeight="34px"
									color="#141415">
									Minesweeper
								</Text>
							</Center>
							<Center bg="white" h="50px" w="100px">
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
						<VStack spacing="3px">
							{board.map((row, index) => (
								<HStack spacing="3px" key={index}>
									{row.map((cell, index) => (
										<Button
											height="50px"
											width="50px"
											fontFamily="Nunito-medium"
											key={index}
											disabled={showMines}
											onClick={() => clickOnCell(cell)}
											onContextMenu={ev => {
												ev.preventDefault();
												flagCell(cell);
											}}
											_focus={{ boxShadow: "none" }}
											className={`available cell ${
												cell.isMine ? "mine" : ""
											} ${
												cell.state === CellState.Number
													? "number"
													: ""
											}`}>
											{getButtonContent(cell, showMines)}
										</Button>
									))}
								</HStack>
							))}
						</VStack>
					</Box>
				</Center>
			)}
			<VictoryModal isOpen={false} onClose={() => console.log("close")} />
		</>
	);
};

export default App;
