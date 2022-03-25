import React, { useEffect } from "react";
import {
	Modal,
	VStack,
	ModalContent,
	ModalBody,
	Button,
	Text,
	HStack,
	CloseButton,
	ModalHeader,
} from "@chakra-ui/react";
import { useColor } from "../utils";
import confetti from "canvas-confetti";

interface IVictoryModalProps {
	isOpen: boolean;
	onMenu: () => void;
	onRepeat: () => void;
	onClose: () => void;
}

export const VictoryModal: React.FC<IVictoryModalProps> = ({
	isOpen,
	onMenu,
	onRepeat,
	onClose,
}) => {
	const colors = useColor();

	useEffect(() => {
		const end = Date.now() + 3 * 1000;

		const colors = ["#ff0000", "#00ff00", "#0000ff"];

		if (isOpen) {
			(function frame() {
				confetti({
					particleCount: 3,
					angle: 60,
					spread: 55,
					origin: { x: 0 },
					colors: colors,
				});
				confetti({
					particleCount: 3,
					angle: 120,
					spread: 55,
					origin: { x: 1 },
					colors: colors,
				});

				if (Date.now() < end) {
					requestAnimationFrame(frame);
				}
			})();
		}
	}, [isOpen]);

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalContent bg={colors.primary}>
					<ModalHeader pb="0">
						<CloseButton onClick={onClose} ml="auto" />
					</ModalHeader>
					<ModalBody pb="32px">
						<VStack>
							<Text
								color={colors.titleText}
								fontFamily="Nunito-medium"
								fontSize="50px"
								lineHeight="68px"
								textTransform="uppercase">
								Victory
							</Text>
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
									onClick={onMenu}>
									Menu
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
									onClick={onRepeat}>
									Repeat
								</Button>
							</HStack>
						</VStack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
