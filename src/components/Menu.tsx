import React, { useState } from "react";
import { Flex, Button, Text, VStack, Center } from "@chakra-ui/react";
import { Level } from "../enums";
import { difficultyLevels, defaultDifficulty } from "../constants";
import { DifficultyLevel } from "../types";
import { CustomModal } from "./CustomModal";
import { useColor } from "../utils";

interface IMenuProps {
	setDifficultyLevel: (value: DifficultyLevel) => void;
}

export const Menu: React.FC<IMenuProps> = ({ setDifficultyLevel }) => {
	const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
	const [customModalOpen, setCustomModalOpen] = useState(false);
	const colors = useColor();
	return (
		<>
			<Center h="100vh" backgroundColor={colors.background}>
				<Flex
					bg={colors.primary}
					direction="column"
					w="370px"
					py="33px"
					boxShadow={`0px 0px 20px ${colors.primary}`}>
					<Text
						textTransform="uppercase"
						color={colors.titleText}
						fontSize="35px"
						lineHeight="48px"
						textAlign="center"
						fontFamily="Nunito-medium">
						Minesweeper
					</Text>
					<VStack spacing="15px" my="40px">
						{difficultyLevels.map(elem => (
							<Button
								key={elem.name}
								onClick={() => setSelectedLevel(elem.level)}
								w="140px"
								h="50px"
								border={
									selectedLevel === elem.level
										? ""
										: `2px solid ${colors.titleText}`
								}
								borderRadius="2px"
								fontSize="30px"
								fontFamily="Nunito-light"
								color={colors.titleText}
								_focus={{
									boxShadow: `0px 0px 20px ${colors.levelHalo}`,
								}}
								bg={
									selectedLevel === elem.level
										? colors.levelHighlight
										: "transparent"
								}
								boxShadow={
									selectedLevel === elem.level
										? `0px 0px 20px ${colors.levelHalo}`
										: ""
								}>
								{elem.name}
							</Button>
						))}
						<Button
							w="140px"
							h="50px"
							border={`2px solid ${colors.titleText}`}
							borderRadius="2px"
							fontSize="30px"
							fontFamily="Nunito-light"
							color={colors.titleText}
							onClick={() => setCustomModalOpen(true)}
							_focus={{ boxShadow: "0px 0px 20px #FFFFFF" }}
							bg={"transparent"}>
							Custom
						</Button>
					</VStack>
					<Button
						background={colors.titleText}
						borderRadius="2px"
						w="245px"
						height="50px"
						alignSelf="center"
						color={colors.startText}
						fontFamily="Nunito-medium"
						fontSize="30px"
						disabled={!selectedLevel}
						onClick={() =>
							setDifficultyLevel(
								difficultyLevels.find(
									elem => elem.level === selectedLevel,
								) || defaultDifficulty,
							)
						}>
						Start Game
					</Button>
				</Flex>
			</Center>
			<CustomModal
				isOpen={customModalOpen}
				onClose={() => setCustomModalOpen(false)}
				onStart={(value: DifficultyLevel) => {
					setCustomModalOpen(false);
					setDifficultyLevel(value);
				}}
			/>
		</>
	);
};
