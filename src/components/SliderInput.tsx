import React from "react";
import {
	HStack,
	Slider,
	SliderTrack,
	SliderThumb,
	Input,
	SliderFilledTrack,
	Text,
} from "@chakra-ui/react";
import { useColor } from "../utils";

interface ISliderInputProps {
	label: string;
	value: number;
	max: number;
	ariaLabel: string;
	setValue: (value: number) => void;
}

export const SliderInput: React.FC<ISliderInputProps> = ({
	ariaLabel,
	label,
	max,
	setValue,
	value,
}) => {
	const colors = useColor();
	return (
		<>
			<Text
				color={colors.titleText}
				fontSize="15px"
				fontFamily="Nunito-light">
				{label}
			</Text>
			<HStack>
				<Slider
					width="100%"
					value={value}
					onChange={setValue}
					aria-label={ariaLabel}
					step={1}
					min={1}
					max={max}>
					<SliderTrack>
						<SliderFilledTrack bg={colors.titleText} />
					</SliderTrack>
					<SliderThumb />
				</Slider>
				<Input
					value={value}
					type="number"
					width="100px"
					min={1}
					max={max}
					textAlign="center"
					color={colors.titleText}
					fontFamily="Nunito-light"
					onChange={value => setValue(+value.target.value)}
				/>
			</HStack>
		</>
	);
};
