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
	return (
		<>
			<Text color="#4A4F49" fontSize="15px" fontFamily="Nunito-light">
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
						<SliderFilledTrack bg="#4A4F49" />
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
					color="#4A4F49"
					fontFamily="Nunito-light"
					onChange={value => setValue(+value.target.value)}
				/>
			</HStack>
		</>
	);
};
