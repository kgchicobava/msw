import React, { useState, useEffect } from "react";
import { HStack, Center, Text } from "@chakra-ui/react";
import { useColor } from "../utils";
import { ReactComponent as MineCountIcon } from "../assets/mine_count.svg";
import { ReactComponent as TimeCountIcon } from "../assets/time_count.svg";

interface IStatsProps {
	minesLeft: number;
	gameStartedAt: number;
}

let timerId: NodeJS.Timer;

export const Stats: React.FC<IStatsProps> = ({ minesLeft, gameStartedAt }) => {
	const colors = useColor();
	const [timeElapsed, setTimeElapsed] = useState(0);
	const [timeFromClick, setTimeFromClick] = useState(0);
	const [clickedTimes, setClickedTimes] = useState(0);

	useEffect(() => {
		if (gameStartedAt) {
			setTimeElapsed(0);
			timerId = setInterval(() => {
				if (timeElapsed <= 999) {
					setTimeElapsed(prev => ++prev);
				}
			}, 1000);
		} else {
			clearInterval(timerId);
		}
	}, [gameStartedAt]);

	const handleEasterEgg = () => {
		if (timeFromClick === 0) {
			setTimeFromClick(new Date().getTime());
		}
		setClickedTimes(prev => ++prev);
		if (clickedTimes === 5) {
			if (new Date().getTime() - timeFromClick < 1000) {
				alert("Miss you, Kate ❤");
				setTimeFromClick(0);
			}
			setTimeFromClick(0);
			setClickedTimes(0);
		}
	};

	return (
		<HStack mb="30px">
			<Center
				bg={colors.availableCell}
				h="50px"
				px="1rem"
				borderRadius="2px">
				<HStack>
					<Text color={colors.primary}>
						<MineCountIcon />
					</Text>
					<Text
						color="#141415"
						fontFamily="Nunito-light"
						fontSize="1.5rem"
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
					fontSize="1.5rem"
					fontFamily="Nunito-medium"
					lineHeight="34px"
					onClick={handleEasterEgg}
					color={colors.titleText}>
					Minesweeper
				</Text>
			</Center>
			<Center
				bg={colors.availableCell}
				h="50px"
				px="1rem"
				borderRadius="2px">
				<HStack>
					<Text
						color="#141415"
						fontFamily="Nunito-light"
						fontSize="1.5rem"
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
