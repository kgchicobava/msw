import React, { useState } from "react";
import { Flex, Button, Text, VStack, Center } from "@chakra-ui/react";
import { Level } from "../enums";
import { difficultyLevels, defaultDifficulty } from "../constants";
import { DifficultyLevel } from "../types";

interface IMenuProps {
	setDifficultyLevel: (value: DifficultyLevel) => void;
}

export const Menu: React.FC<IMenuProps> = ({ setDifficultyLevel }) => {
	const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
	return (
		<Center h="100vh">
			<Flex
				bg="#C5CBC4"
				direction="column"
				w="370px"
				py="33px"
				boxShadow="0px 0px 20px #C5CBC4">
				<Text
					textTransform="uppercase"
					color="#3F423E"
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
									: "2px solid #3F423E"
							}
							borderRadius="2px"
							fontSize="30px"
							fontFamily="Nunito-light"
							color="#3F423E"
							_focus={{ boxShadow: "0px 0px 20px #FFFFFF" }}
							bg={
								selectedLevel === elem.level
									? "#FFFFFF"
									: "transparent"
							}
							boxShadow={
								selectedLevel === elem.level
									? "0px 0px 20px #FFFFFF;"
									: ""
							}>
							{elem.name}
						</Button>
					))}
				</VStack>
				<Button
					background="#3F423E"
					borderRadius="2px"
					w="245px"
					height="50px"
					alignSelf="center"
					color="#F7F7FB"
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
	);
};
