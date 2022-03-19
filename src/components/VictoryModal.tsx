import React from "react";
import {
	Modal,
	VStack,
	ModalContent,
	ModalBody,
	Button,
	Text,
	HStack,
} from "@chakra-ui/react";
import Confetti from "react-confetti";

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
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<Confetti />
			<ModalContent bg="#C7D4D4">
				<ModalBody py="32px">
					<VStack>
						<Text
							color="#4A4F49"
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
								background="white"
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
								background="white"
								borderRadius="0"
								onClick={onRepeat}>
								Repeat
							</Button>
						</HStack>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
