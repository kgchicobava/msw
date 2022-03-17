import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

const Button = {
	baseStyle: (props: any) => ({
		fontWeight: "bold",
		fontSize: "16px",
		lineHeight: "22px",
		borderRadius: "8px",
		paddingTop: "2px",
		color: mode("orange", "crimson")(props),
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

const theme = extendTheme({ config, components: { Button } });

export default theme;
