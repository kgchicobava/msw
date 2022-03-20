import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

const colors = {
	primary_light: "#C7D4D4",
	primary_dark: "#576262",
	background_light: "#E5E5E5",
	background_dark: "#141415",
	empty_cell_light: "#EAEEEE",
	empty_cell_dark: "#3E4646",
	available_cell_light: "white",
	available_cell_dark: "#EEF0ED",
	title_text_light: "#3F423E",
	title_text_dark: "#EEF0ED",
};

const Button = {
	baseStyle: (props: any) => ({
		fontWeight: "bold",
		fontSize: "16px",
		lineHeight: "22px",
		borderRadius: "8px",
		paddingTop: "2px",
		// color: mode("orange", "crimson")(props),
	}),
	sizes: {
		md: {
			height: "50px",
		},
	},
	// The default size and variant values
	defaultProps: {
		size: "md",
	},
};

const theme = extendTheme({ config, colors });

export default theme;
