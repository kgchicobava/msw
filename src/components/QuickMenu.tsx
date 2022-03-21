import React from "react";
import { VStack, IconButton, useColorMode } from "@chakra-ui/react";
import { useColor } from "../utils";
import { ReactComponent as ThemeIcon } from "../assets/theme.svg";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import { ReactComponent as ReplayIcon } from "../assets/replay.svg";

interface IQuickMenuProps {
	showMines: boolean;
	setGameStarted: (value: boolean) => void;
	onReplay: () => void;
}

export const QuickMenu: React.FC<IQuickMenuProps> = ({
	showMines,
	setGameStarted,
	onReplay,
}) => {
	const colors = useColor();
	const { toggleColorMode } = useColorMode();
	return (
		<VStack position="absolute" left="-60px" top="0">
			<IconButton
				aria-label="Menu"
				h="50px"
				w="50px"
				borderRadius="3px"
				onClick={() => {
					setGameStarted(false);
				}}
				background={colors.primary}
				boxShadow={`0px 0px 20px ${colors.primary}`}>
				<MenuIcon />
			</IconButton>
			<IconButton
				aria-label="Switch theme"
				borderRadius="3px"
				onClick={toggleColorMode}
				h="50px"
				w="50px"
				background={colors.primary}
				boxShadow={`0px 0px 20px ${colors.primary}`}>
				<ThemeIcon />
			</IconButton>
			{showMines && (
				<IconButton
					aria-label="Replay"
					borderRadius="3px"
					h="50px"
					w="50px"
					background={colors.primary}
					onClick={onReplay}
					boxShadow={`0px 0px 20px ${colors.primary}`}>
					<ReplayIcon />
				</IconButton>
			)}
		</VStack>
	);
};
