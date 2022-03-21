export {};
// import React from "react";
// import { Grid, Button } from "@chakra-ui/react";

// interface IGameFieldProps {

// }

// export const GameField: React.FC = () => {
// 	return (
// 		<Grid
// 			templateColumns={`repeat(${difficultyLevel.ySide}, auto)`}
// 			templateRows={`repeat(${difficultyLevel.xSide}, auto)`}
// 			gap="3px"
// 			maxH="80vh">
// 			{board.map((row, index) => (
// 				<React.Fragment key={index}>
// 					{row.map((cell, index) => (
// 						<Button
// 							minW="auto"
// 							height={`calc((80vh / ${difficultyLevel.xSide}) - 6px)`}
// 							width={`calc((80vh / ${difficultyLevel.xSide}) - 6px)`}
// 							borderRadius="2px"
// 							fontFamily="Nunito-medium"
// 							key={index}
// 							pointerEvents={showMines ? "none" : "all"}
// 							transition="all 0s"
// 							backgroundColor={getCellBg(cell)}
// 							fontSize="30px"
// 							color="#3F423E"
// 							fontWeight={300}
// 							onClick={() => clickOnCell(cell)}
// 							onContextMenu={ev => {
// 								ev.preventDefault();
// 								flagCell(cell);
// 							}}
// 							px="0"
// 							p="10%"
// 							_focus={{ boxShadow: "none" }}>
// 							{getButtonContent(cell, showMines)}
// 						</Button>
// 					))}
// 				</React.Fragment>
// 			))}
// 		</Grid>
// 	);
// };
