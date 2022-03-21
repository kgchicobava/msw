import React, { useState, useEffect } from "react";
import {
	Modal,
	ModalContent,
	ModalBody,
	VStack,
	Text,
	Button,
	HStack,
	ModalOverlay,
	Box,
} from "@chakra-ui/react";
import { SliderInput } from "../components/SliderInput";
import { DifficultyLevel } from "../types/types";
import { Level } from "../constants/enums";
import { useColor } from "../utils";

interface ICustomModalProps {
	isOpen: boolean;
	onClose: () => void;
	onStart: (value: DifficultyLevel) => void;
}

export const CustomModal: React.FC<ICustomModalProps> = ({
	isOpen,
	onClose,
	onStart,
}) => {
	const [width, setWidth] = useState(10);
	const [height, setHeight] = useState(10);
	const [numberOfMines, setNumberOfMines] = useState(10);
	const [maxPossibleMines, setMaxPossibleMines] = useState(10);
	const colors = useColor();

	useEffect(() => {
		setMaxPossibleMines(height * width - 9);
		if (numberOfMines > height * width - 9) {
			setNumberOfMines(height * width - 9);
		}
	}, [height, width]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent bg={colors.primary}>
				<ModalBody py="32px">
					<VStack>
						<Text
							color={colors.titleText}
							fontFamily="Nunito-medium"
							fontSize="50px"
							lineHeight="68px"
							textTransform="uppercase">
							Custom
						</Text>
						<Box w="100%">
							<SliderInput
								ariaLabel="width slider"
								label="Width"
								max={30}
								setValue={setWidth}
								value={width}
							/>
							<SliderInput
								ariaLabel="height slider"
								label="Height"
								max={24}
								setValue={setHeight}
								value={height}
							/>
							<SliderInput
								ariaLabel="mines slider"
								label="Mines"
								max={maxPossibleMines}
								setValue={setNumberOfMines}
								value={numberOfMines}
							/>
						</Box>
						<HStack>
							<Button
								textTransform="uppercase"
								color="#4A4F49"
								fontSize="25px"
								fontFamily="Nunito-light"
								w="150px"
								height="50px"
								background={colors.availableCell}
								borderRadius="0"
								fontWeight={300}
								onClick={onClose}>
								Cancel
							</Button>
							<Button
								textTransform="uppercase"
								color="#4A4F49"
								fontWeight={300}
								fontSize="25px"
								fontFamily="Nunito-light"
								w="150px"
								height="50px"
								background={colors.availableCell}
								borderRadius="0"
								onClick={() =>
									onStart({
										level: Level.Custom,
										name: "custom",
										numberOfMines: numberOfMines,
										xSide: height,
										ySide: width,
									})
								}>
								Start
							</Button>
						</HStack>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
