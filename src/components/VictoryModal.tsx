import React from "react";
import {
	Modal,
	VStack,
	ModalContent,
	ModalBody,
	Button,
	Text,
} from "@chakra-ui/react";
import Confetti from "react-confetti";

interface IVictoryModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const VictoryModal: React.FC<IVictoryModalProps> = ({
	isOpen,
	onClose,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<Confetti />
			<ModalContent bg="#C5CBC4">
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
						<Button
							textTransform="uppercase"
							color="#4A4F49"
							fontSize="25px"
							fontFamily="Nunito-light"
							w="100px"
							height="50px"
							background="white"
							borderRadius="0"
							onClick={onClose}>
							Menu
						</Button>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
