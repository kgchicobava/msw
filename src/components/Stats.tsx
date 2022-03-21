import React, { useState, useEffect } from "react";
import { HStack, Center, Text } from "@chakra-ui/react";
import { useColor } from "../utils";
import { ReactComponent as MineCountIcon } from "../assets/mine_count.svg";
import { ReactComponent as TimeCountIcon } from "../assets/time_count.svg";

interface IStatsProps {
	minesLeft: number;
	timeElapsed?: number;
}

export const Stats: React.FC<IStatsProps> = ({ minesLeft }) => {
	const colors = useColor();
	// https://stackoverflow.com/questions/37949981/call-child-method-from-parent
	const [timeElapsed, setTimeElapsed] = useState(0);

	useEffect(() => {
		const timerId = setInterval(() => {
			if (timeElapsed <= 999) {
				setTimeElapsed(prev => ++prev);
			}
		}, 1000);
	}, []);

	return (
		<HStack mb="30px">
			<Center
				bg={colors.availableCell}
				h="50px"
				w="150px"
				borderRadius="2px">
				<HStack>
					<Text color={colors.primary}>
						<MineCountIcon />
					</Text>
					<Text
						color="#141415"
						fontFamily="Nunito-light"
						fontSize="30px"
						lineHeight="40px">
						{(minesLeft / 100).toFixed(2).replace(".", "")}
					</Text>
				</HStack>
			</Center>
			<Center
				bg={colors.emptyCell}
				height="50px"
				flex={1}
				borderRadius="2px">
				<Text
					textTransform="uppercase"
					fontSize="25px"
					fontFamily="Nunito-medium"
					lineHeight="34px"
					color={colors.titleText}>
					Minesweeper
				</Text>
			</Center>
			<Center
				bg={colors.availableCell}
				h="50px"
				w="150px"
				borderRadius="2px">
				<HStack>
					<Text
						color="#141415"
						fontFamily="Nunito-light"
						fontSize="30px"
						lineHeight="40px">
						{(timeElapsed / 100).toFixed(2).replace(".", "")}
					</Text>
					<Text color={colors.primary}>
						<TimeCountIcon />
					</Text>
				</HStack>
			</Center>
		</HStack>
	);
};
