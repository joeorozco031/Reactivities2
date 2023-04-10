
import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
    inverted?: boolean;     //? -> optional
    content?: string;       //? -> optional
}

export default function LoadingComponents({inverted = true, content = "Loading..."}: Props) {

    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
}