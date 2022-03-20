import { useColorModeValue } from "@chakra-ui/react";

export function useColor() {
	const primary = useColorModeValue("#C7D4D4", "#576262");
	const background = useColorModeValue("#E5E5E5", "#141415");
	const emptyCell = useColorModeValue("#EAEEEE", "#3E4646");
	const availableCell = useColorModeValue("white", "#EEF0ED");
	const titleText = useColorModeValue("#3F423E", "#EEF0ED");
	const startText = useColorModeValue("#F7F7FB", "#3E4646");
	const levelHighlight = useColorModeValue("#FFFFFF", "#3E4646");
	const levelHalo = useColorModeValue("#ffffff", "transparent");

	return {
		primary,
		background,
		emptyCell,
		availableCell,
		titleText,
		startText,
		levelHighlight,
		levelHalo,
	};
}
